import { 
    addNewContact, 
    getContacts, 
    getContactWithID, 
    updateContact,
    deleteContact 
} from '../controllers/crmController';

import {
    login,
    loginRequired,
    register
} from '../controllers/userController';

const routes = (app) => {
    app.route('/contacts')

    // GET all contacts
    .get((req, res, next) => {
        // middleware
        console.log(`Request from: ${req.originalUrl}`)
        console.log(`Request type: ${req.method}`)
        next();
    }, loginRequired, getContacts)
    
    // POST endpoint - Add new crm contact
    .post(loginRequired, addNewContact);

    app.route('/contact/:contactId')
    // get specific contact
    .get(loginRequired, getContactWithID)
    
    // put request - update specific contact
    .put(loginRequired, updateContact)

    // delete request - delete specific contact
    .delete(loginRequired, deleteContact);

    // registration route
    app.route('/auth/register')
        .post(register);

    // login route
    app.route('/auth/login')
        .post(login);
}

export default routes;
