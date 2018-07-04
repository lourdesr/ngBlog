angular.module('myApp').controller('homeCtrl',['$scope','$http',function($scope, $http){

$scope.showPost = false;
$scope.showPostForm = false;
$scope.blogContent = [];
//$scope.editable = false;
$scope.curItems = {};

$scope.getRecentPosts = function(){

$http({
        method : "GET",
        url : "/getBlogPosts"
    }).success(function(response){
    		console.log(response);
    		$scope.blogData = response;
    });
};


$scope.createNewPost = function(blogdata){
$http({
        method : "POST",
        url : "/createBlogPost",
        data : {
        	title: blogdata.title,
        	body: blogdata.body,
        	user: blogdata.user
        }
    }).then(function(data) {
  		console.log("DATA " + data.data);
        alert("POST ADDED!");
        $scope.getRecentPosts();
        $scope.showPost = true;
        $scope.showPostForm = false;
		});

};

$scope.updateBlogPost = function(title,body,id){
    $http({
        method : "PUT",
        url : "/updateBlogPost/"+id+"/"+decodeURIComponent(title)+"/"+decodeURIComponent(body)
    }).then(function(data) {
        console.log("DATA " + data.data);
        });
}



$scope.deleteBlogPost = function(id){


$http({
        method : "DELETE",
        url : "/deleteBlogPost/"+id
    }).then(function(data) {
        console.log("DATA " + data.data);
        });

};



$scope.delPost = function(index,id){
	//console.log(id);
    $scope.blogData.splice(index,1);
    $scope.deleteBlogPost(id);
};



$scope.getBlogs = function(){

$scope.getRecentPosts();
$scope.showPost = true;
$scope.showPostForm = false;

};


$scope.createPost = function(){
 $scope.showPost = false;
 $scope.showPostForm = true;
 $scope.blogContent.title = '';
 $scope.blogContent.body = '';
 $scope.blogContent.user = '';





}

$scope.addPost = function(){

$scope.blogContent.push(angular.extend({
                    title: '',
                    body: '',
                    user: ''
                }));

//$scope.blogContent.push({title:$scope.title, body:$scope.body, user:$scope.user});
//console.log($scope.blogContent.title,);
$scope.createNewPost($scope.blogContent);
};

$scope.updatePost = function(newitem){
    
    newitem.edit = false
    var title = newitem.title;
    var body = newitem.body;
    var pid = newitem.id;

    if($scope.curItems.title != title || $scope.curItems.body != body){

            console.log("Changes made!");
            $scope.updateBlogPost(title,body,pid);

        }

};

$scope.discardUserChanges = function(item){
    console.log(item);
    item.title = $scope.curItems.title;
    item.body = $scope.curItems.body;
    item.edit = false;
}

$scope.editPostHandler = function(i,curitem){
    $scope.curItems = angular.copy($scope.blogData[i]);
    curitem.edit = true;
}
}]);