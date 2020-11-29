# oceancy

<br>

## Description

A travel app to find attractive water-activities to attend as well as networking with those users.


# Server / Backend


## Models

User model

```javascript
{
  fullName: {type: String, required: true, unique: true},
  email: {type: String, required: true, unique: true},
  password: {type: String, required: true},
  favoriteActivity: {type: String},
  level : {type: String},
  isAdmin : {type :Boolean,default :false},
  activitiesHosting: [{type: Schema.Types.ObjectId, ref: "Activity"}],
  activitiesAttending: [{type : Schema.Types.ObjectId, ref: "Activity"}],
}
```

Session model

```javascript
{
  userId: [{type: Schema.Types.ObjectId,ref:'User'}],
  dateCreated : [{type: Date'}],
}
```

Destination model

```javascript
 {
   name: {type: String, required: true},
   photoUrl: {type: String},
 }
```

Activity model

```javascript
{
  name: {type: String, required: true},
  description: {type: String, maxlength : 500},
  type: {type: String, required: true},
  startDate :{type: Date,default: Date.now,required :true},
  endDate   :{type: Date,default: Date.now,required :true},
  price: {type: String, required: true},
  address: {type: String},
  destination: {type: String},
  photoUrl: {type: String},
  host: {type: Schema.Types.ObjectId, ref: 'User'},
  attendees: [{ type: Schema.Types.ObjectId, ref: 'User' }], 
  
  },

```



<br>

## API Endpoints (backend routes)

| HTTP Method | URL                         | Request Body                 | Success status | Error Status | Description                                                  |
| ----------- | --------------------------- | ---------------------------- | -------------- | ------------ | ------------------------------------------------------------ |
| GET         | `/auth/profile    `           | Saved session                | 200            | 404          | Check if user is logged in and return profile page           |
| POST        | `/auth/signup`                | {name, email, password}      | 201            | 404          | Checks if fields not empty (422) and user not exists (409), then create user with encrypted password, and store user in session |
| POST        | `/auth/login`                 | {username, password}         | 200            | 401          | Checks if fields not empty (422), if user exists (404), and if password matches (404), then stores user in session |
| POST        | `/auth/logout`                | (empty)                      | 204            | 400          | Logs out the user                                            |
| GET         | `/activities`                |                              |                | 400           | Show all activities                                         |
| GET         | `/activites/:id`              | {id}                         |                |              | Show specific activity                                    |
| POST        | `/activities/add`               | {}                           | 201            | 400          | Create and save a new activity                            |
| PUT         | `/activities/edit/:id`          | {name,img,description}       | 200            | 400          | edit activity                                            
| DELETE      | `/activities/delete/:id`         | {id}                         | 201            | 400          | delete activity                                            |
| GET         | `/profile`                    |                              |                | 400          | show profile                                                |
| GET         | `/profile/:id`                | {id}                         |                |              | show others' profile                                        |
| PUT         | `/profiles/edit/:id`           | {name,img}                   | 201            | 400          | edit and update profile                                                 |
| GET         | `/home`                       |                              | 201            | 400          | show home                                                   |
| GET         | `/home/search`                | {searchQuery}                |                |              | show specific query                                          |


<br>



## Links

### Trello/Kanban

[Link to your trello board](https://trello.com/b/iQixIKJd/oceancy) 


### Git

The url to your repository and to your deployed project

[Client repository Link](https://github.com/cris-developer/oceancy-client)

[Server repository Link](https://github.com/cris-developer/oceancy-server)

[Deployed App Link](http://heroku.com)

### Slides

The url to your presentation slides

[Slides Link](http://slides.com)




