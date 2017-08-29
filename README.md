
# Wallaby Ads Ad Posting Application

[![Build Status](https://travis-ci.org/jeremytaylor7/wallaby-ads-project.svg?branch=master)](https://travis-ci.org/jeremytaylor7/wallaby-ads-project)

## Heroku URL
[Heroku Project Link](https://sheltered-bastion-34291.herokuapp.com/)

## Function: 
Ad posting platform designed exclusively for business owners
online and offline. This allows business owners to post various
descriptive ads linking to their site to simply and effectively
gain exposure for their businesses.

## Screenshots:
http://imgur.com/yLemEcd

http://imgur.com/yLemEcd

## Technologies used:
HTML, CSS, Javascript, Jquery, Bootstrap 4, Express js, Node js, MongoDB, Mongoose, RESTful API

##RESTful API Docs:

Base URL: https://sheltered-bastion-34291.herokuapp.com/api



## User Stories

1. As a user I would like to create an account
2. As a user I would like to view a dashboard
3. As a user I would like to post an ad with a title/picture/link/description
4. As a user I would like to see how many ads I've posted.
5. As a user I would like to view all ads I've posted.
6. ~~As a user I would like to view ads others have posted.~~
7. As a user I would like to view how many times my ad was clicked.
8. As a user I would like to rate ads based on quality
9. As a user I would like to favorite and like ads.
10. As a user I would like to keep track of ads that I have favorited.


## Descope

#'s 3-6

## Screens/User Flows

Landing Page: Title/logo paragraph(explaining app) sign up form and footer

### Sign up form:
If user enters correct email and password ---> go to dashboard   
If user enters incorrect email and password ---> error message  
If forgets a field ---> error message

### Dashboard: nav bar and ad info

#### Nav Bar:

If user clicks home button ---> go back to dashboard  
If user clicks view my ads button ---> go to my ads page  
If user clicks ad wall button ---> go to ad wall


### Post an ad: fields that allow user to input information about ad.

#### post an ad page:

If user enter correct info into fields and clicks submit
--> go to ad wall

If user exceeds character limit in description --> error message

If user clicks submit whilst missing a field --> error message

If user tries to upload an image that is too large --> raise error

If user upload an image with correct resoultion --> image success message


### View Ads I've posted: display ad elements on page

### view other ads: display ad elements

