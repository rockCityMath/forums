import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map } from 'rxjs/operators'
import { Observable } from 'rxjs'

//const baseUrl = 'http://68.184.184.100:3232';
const baseUrl = 'http://192.168.1.14:3232'
const getMostLikedUrl = '/api/post/mostLiked'
const loginUrl = '/auth/login'
const registerUrl = '/auth/register'
const getMostRecentUrl = '/api/post/mostRecent'
const createPostUrl = '/api/post'
const usernameFromIDUrl = '/auth/usernameFromID'
const postDetailsUrl = '/api/post'
const commentByIDUrl = '/api/comment'
const usersPostsByIDURL = '/api/post/userPosts'
const userDetailsURL ='/api/user'
const userCommentsURL = '/api/comment/userComments'
const addCommentURL = '/api/comment/add'
const postCommentsURL = '/api/comment/postComments'
const updateCommentURL = '/api/comment/updateComment'
const updatePostURL = '/api/post/updatePost'
const searchByTitleURL = '/api/post/searchTitle'
const searchByTagsURL = '/api/post/searchTags'
const userStatsURL = '/api/user/stats'
const likePostURL = '/api/like/likePost'
const unlikePostURL = '/api/like/unlikePost'
const getUserIDURL = '/auth/getID'

@Injectable({
  providedIn: 'root'
})

//Interface with the backend, add JWT to backend calls
export class ServerService {

  //Set on setLoggedIn()
  public loggedIn = false;
  private token?: string;
  private username?: string;

  constructor(private http: HttpClient) {}

  //Call externally to set login state and token
  setLoggedIn(loggedIn: boolean, token?: string) {
    this.loggedIn = loggedIn;
    this.token = token;
  }

  setUsername(username: string) {
    this.username = username
  }
  getUsername() {
    return this.username
  }

  //Functions used for most API calls
  getMostLiked() {
    const header = (this.loggedIn) ? { Authorization: `Bearer ${this.token}` } : undefined;
    const posts = this.http.get(baseUrl + getMostLikedUrl, {
      responseType: 'json',
      headers: header
    })
    return posts
  }

  getMostRecent() {
    const header = (this.loggedIn) ? { Authorization: `Bearer ${this.token}` } : undefined;
    const posts = this.http.get(baseUrl + getMostRecentUrl, {
      responseType: 'json',
      headers: header
    })
    return posts
  }

  login(loginData?:any ) {
    const header = (this.loggedIn) ? { Authorization: `Bearer ${this.token}` } : undefined;
    return this.http.request("POST", baseUrl + loginUrl, {
      body: loginData,
      responseType: 'json',
      observe: 'body',
      headers: header
    });
  }

  register(userData?: any) {
    const header = (this.loggedIn) ? { Authorization: `Bearer ${this.token}` } : undefined;
    return this.http.request("POST", baseUrl + registerUrl, {
      body: userData,
      responseType: 'json',
      observe: 'body',
      headers: header
    });
  }

  createPost(postData?: any) {
    const header = (this.loggedIn) ? { authorization: `Bearer ${this.token}` } : undefined;
    return this.http.request("POST", baseUrl + createPostUrl, {
      body: postData,
      responseType: 'json',
      observe: 'body',
      headers: header
    });
  }

  getUsernameFromID(userID?: any) {
    const header = (this.loggedIn) ? { authorization: `Bearer ${this.token}` } : undefined;
    return this.http.request("POST", baseUrl + usernameFromIDUrl, {
      body: userID,
      responseType: 'json',
      observe: 'body',
      headers: header
    });
  }

  getPostDetails(id: any) {
    const header = (this.loggedIn) ? { authorization: `Bearer ${this.token}` } : undefined;
    return this.http.request("GET", baseUrl + postDetailsUrl + "/" + id, {
      responseType: 'json',
      observe: 'body',
      headers: header
    });
  }

  getComment(id: any) {
    const header = (this.loggedIn) ? { authorization: `Bearer ${this.token}` } : undefined;
    return this.http.request("GET", baseUrl + commentByIDUrl + "/" + id, {
      responseType: 'json',
      observe: 'body',
      headers: header
    });
  }

  getUsersPosts(id: any) {
    const header = (this.loggedIn) ? { authorization: `Bearer ${this.token}` } : undefined;
    return this.http.request("GET", baseUrl + usersPostsByIDURL + "/" + id, {
      responseType: 'json',
      observe: 'body',
      headers: header
    });
  }

  getUser(id: any) {
    const header = (this.loggedIn) ? { authorization: `Bearer ${this.token}` } : undefined;
    return this.http.request("GET", baseUrl + userDetailsURL + "/" + id, {
      responseType: 'json',
      observe: 'body',
      headers: header
    });
  }

  getUserComments(id: any) {
    const header = (this.loggedIn) ? { authorization: `Bearer ${this.token}` } : undefined;
    return this.http.request("GET", baseUrl + userCommentsURL + "/" + id, {
      responseType: 'json',
      observe: 'body',
      headers: header
    });
  }

  addReply(replyData: any, id: any) {
    const header = (this.loggedIn) ? { authorization: `Bearer ${this.token}` } : undefined;
    return this.http.request("POST", baseUrl + addCommentURL + '/' + id, {
      body: replyData,
      responseType: 'json',
      observe: 'body',
      headers: header
    });
  }

  getPostComments(id: any) {
    const header = (this.loggedIn) ? { authorization: `Bearer ${this.token}` } : undefined;
    return this.http.request("GET", baseUrl + postCommentsURL + "/" + id, {
      responseType: 'json',
      observe: 'body',
      headers: header
    });
  }

  //New functionality
  likePost(id: any) {
    const header = (this.loggedIn) ? { authorization: `Bearer ${this.token}` } : undefined;
    return this.http.request("POST", baseUrl + likePostURL + '/' + id, {
      responseType: 'json',
      observe: 'body',
      headers: header
    });
  }

  unlikePost(id: any) {
    const header = (this.loggedIn) ? { authorization: `Bearer ${this.token}` } : undefined;
    return this.http.request("POST", baseUrl + unlikePostURL + '/' + id, {
      responseType: 'json',
      observe: 'body',
      headers: header
    });
  }

  updateComment(content: any, id: any) {
    const header = (this.loggedIn) ? { authorization: `Bearer ${this.token}` } : undefined;
    return this.http.request("PUT", baseUrl + updateCommentURL + '/' + id, {
      body: content,
      responseType: 'json',
      observe: 'body',
      headers: header
    });
  }

  updatePost(content: any, id: any) {
    const header = (this.loggedIn) ? { authorization: `Bearer ${this.token}` } : undefined;
    return this.http.request("PUT", baseUrl + updatePostURL + '/' + id, {
      body: content,
      responseType: 'json',
      observe: 'body',
      headers: header
    });
  }

  searchByTitle(query: any) {
    const header = (this.loggedIn) ? { authorization: `Bearer ${this.token}` } : undefined;
    return this.http.request("GET", baseUrl + searchByTitleURL, {
      responseType: 'json',
      observe: 'body',
      headers: header
    });
  }

  searchByTags(query: any) {
    const header = (this.loggedIn) ? { authorization: `Bearer ${this.token}` } : undefined;
    return this.http.request("GET", baseUrl + searchByTagsURL, {
      responseType: 'json',
      observe: 'body',
      headers: header
    });
  }

  getUserStats(id: any) {
    const header = (this.loggedIn) ? { authorization: `Bearer ${this.token}` } : undefined;
    return this.http.request("GET", baseUrl + userStatsURL + '/' + id, {
      responseType: 'json',
      observe: 'body',
      headers: header
    });
  }

  getUserID() {
    const header = (this.loggedIn) ? { authorization: `Bearer ${this.token}` } : undefined;
    return this.http.request("GET", baseUrl + getUserIDURL, {
      responseType: 'json',
      observe: 'body',
      headers: header
    });
  }

}
