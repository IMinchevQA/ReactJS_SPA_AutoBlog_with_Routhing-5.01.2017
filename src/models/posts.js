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

export{loadPosts, loadPostDeatils, editPost, deletePost, createPost, addPostComment, updateLikes}