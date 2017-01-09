/**
 * Created by Ivan Minchev on 23.12.2016 г..
 */
import {get, update, del, post} from './requester'

function loadPosts(callback){
    //callback is  actually function onloadSuccess(response){...
    // console.dir(Infobox.prototype.handleAjaxError)
    get('appdata', 'posts', 'kinvey')
        .then(callback)
        // .catch(Infobox.prototype.setState()))
    
}



function findLatestPosts(callback) {
    if(sessionStorage.getItem('username')){
        get('appdata', 'posts/?query={}&sort={"_kmd":-1}&limit=6', 'kinvey')
            .then(callback)
    } else {
        get('appdata', 'posts/?query={}&sort={"_kmd":-1}&limit=6', 'guestUser')
            .then(callback)
    }
}

function findMostVisitedPosts(callback){
    //The function sorts the posts by two criterias: 1st.-visitCounts, 2nd.-date
    function sortPosts(a, b) {
        let visitCountA = a.countVisited;
        let visitCountB = b.countVisited;
        let dateA = new Date(a._kmd).getTime();
        let dateB = new Date(b._kmd).getTime();
        let countDifference = visitCountA - visitCountB
        if( countDifference !== 0){
            return countDifference
        }
        return Number(dateA) - Number(dateB);
    };

    //Requesting the records for posts visits count from collection 'postViewsLikes'
    get('appdata', 'postViewsLikes/', 'kinvey')
        .then(function(response){
            //arrRequests will keep 5-get requests for the most visited posts.
            //Why: To ensure sequence matching btw. the requests sent and returned by Kinvey responses.

            let arrRequests = []
            let postsRecordsSortedByVisit_Date = response.sort(sortPosts).reverse().slice(0,5);
            let sortedPosts = []
            //console.log(postsRecordsSortedByVisit_Date)

            //Generating 5 separate 'GET' requests and save them in the array 'arrRequests'
            for(let element of postsRecordsSortedByVisit_Date){
                arrRequests.push(get('appdata', 'posts/' + element.postId, 'kinvey'))
            }

            //Sending the 5-requests package.
            Promise.all(arrRequests)
                .then(function(resp){
                    sortedPosts = resp.map((post, index) => [post, postsRecordsSortedByVisit_Date[index]]);
                    callback(sortedPosts)
                });


        })
    
}

function createPost(title, author, imageUrl, description, callback) {
    let postData = {
        title: title,
        author: author,
        imageUrl: imageUrl,
        description: description,
        date: new Date(),
    };

    let visitCountsLikesData = {
        postId: '',
        countVisited: 0,
        countLiked: ["empty"]
    }

    post('appdata', 'posts/', postData, 'kinvey')
        .then(function(response){
            visitCountsLikesData['postId'] = response._id;
            post('appdata', 'postViewsLikes/', visitCountsLikesData, 'kinvey')
                .then(callback)
        })

}

function updateLikes(postId, countVisited, likes, visitLikesRecordId, callback){
    let visitCountsLikesDataUpdated = {
        postId: postId,
        countVisited: countVisited,
        countLiked: likes
    };

    update('appdata', 'postViewsLikes/' + visitLikesRecordId, visitCountsLikesDataUpdated, 'kinvey')
        .then(callback)


}

function addPostComment(postId, comment, commentAuthor, callback){
    let postCommentData = {postId, comment, commentAuthor};
    post('appdata', 'postComments', postCommentData, 'kinvey')
        .then(callback)
    
}


function loadPostDeatils(postId, callback, edit_delete){
    if(typeof(edit_delete) === 'string'){
        get('appdata', 'posts/' + postId, 'kinvey')
            .then(callback)
    } else {
        get('appdata', 'postViewsLikes/?query={"postId":"' + postId + '"}', 'kinvey')
            .then(function (response) {
                let visitCountsLikesDataUpdated = {
                    postId: response[0].postId,
                    countVisited: Number(response[0].countVisited) + 1,
                    countLiked: response[0].countLiked
                };
                update('appdata', 'postViewsLikes/' + response[0]._id, visitCountsLikesDataUpdated, 'kinvey')
                    .then(function (response) {
                        let loadPostDetailsRequest = get('appdata', 'posts/' + postId, 'kinvey');
                        let loadPostCommentsRequest = get('appdata', 'postComments/?query={"postId":"' + postId + '"}', 'kinvey');
                        let loadPostVisitsLikes = get('appdata', 'postViewsLikes/?query={"postId":"' + postId + '"}', 'kinvey');
                        Promise.all([loadPostDetailsRequest, loadPostCommentsRequest, loadPostVisitsLikes])
                            .then(callback)
                    })
            })
    }

}

function editPost(postId, title, author, description, date, imageUrl, callback, that){
    let postData ={ title, author, description, date, imageUrl }

    update('appdata', 'posts/' + postId, postData, 'kinvey')
        .then(function(response){
            callback(response, that);

        })
}

function deletePost(postId, callback, that){
    let delPostRequest = del('appdata', 'posts/' + postId, 'kinvey')
    let delPostCommentsRequest = del('appdata', 'postComments/?query={"postId":"' + postId + '"}', 'kinvey');
    let delPostVisitsLikesRequest = del('appdata', 'postViewsLikes/?query={"postId":"' + postId + '"}', 'kinvey');
    Promise.all([delPostCommentsRequest, delPostRequest, delPostVisitsLikesRequest])
        .then(function(response) {
            callback(response, that)
        });
}

export{loadPosts, loadPostDeatils, editPost, deletePost, createPost, addPostComment, updateLikes, findLatestPosts, findMostVisitedPosts}