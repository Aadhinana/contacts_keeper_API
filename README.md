# Contacts Keeper API

An authenticate API to store contacts for different users.

## Endpoints

1. POST /user { email: "test@gmail.com" , password: "password" }
   
   This will register a user with the app and return a JWT token.


>**NOTE : The below end points need you to be registered with the app first and attach a header { authorization: Bearer _YourJWTToken_ }**


2. POST /auth { email: "test@gmail.com" , password: "password" }
   
   This will authenticate the user and return a JWT token.

3. GET /contacts 
   
   Fetch all contacts.

4. POST /contacts { name: "name", email: "email", phone: "phone" }
   
   To create a new contact. (_name_ is only required)

5. PUT /contact/:id { name: "name", email: "email", phone: "phone" }
    
    To update a contact. --  _id refers to the contactID_
   
6. DELETE /contact/:id  
    
    To delete a contact. --  _id refers to the contactID_


