const User = require('../models/User');
const Thread = require('../models/Thread');
const encryption = require('../util/encryption');

module.exports = {
  register: {
    get: (req, res) => {
      res.render('users/register')
    },
    post: (req, res) => {
      let userData = req.body;

      if (
        userData.password &&
        userData.password !== userData.confirmedPassword
      ) {
        userData.error = 'Passwords do not match';
        res.render('users/register', userData);
        return
      }

      let salt = encryption.generateSalt();
      userData.salt = salt;

      if (userData.password) {
        userData.hashedPass = encryption.generateHashedPassword(
          salt,
          userData.password
        )
      }

      User.create(userData)
        .then(user => {
          req.logIn(user, (err, user) => {
            if (err) {
              res.render('users/register', { error: 'Wrong credentials!' });
              return;
            }

            res.redirect('/');
          })
        })
        .catch(error => {
          userData.error = error;
          res.render('users/register', userData)
        })
    }
  },
  login: {
    get: (req, res) => {
      res.render('users/login');
    },
    post: (req, res) => {
      let userData = req.body;

      User.findOne({ username: userData.username }).then(user => {
        if (!user || !user.authenticate(userData.password)) {
          res.render('users/login', { error: 'Wrong credentials!' });
          return;
        }

        req.logIn(user, (err, user) => {
          if (err) {
            res.render('users/login', { error: 'Wrong credentials!' });
            return;
          }

          res.redirect('/');
        })
      })
    }
  },
  logout: (req, res) => {
    req.logout();
    res.redirect('/')
  },
    find: (req, res) => {
      let currentUser = req.user.username;
      let otherUser = req.query.username;
        if (currentUser === otherUser) {
            return res.redirect('/?error=Cannot chat with yourself!');
        }

        User.findOne({ username: otherUser})
            .then(otherUserObj => {
                if(!otherUserObj) {
                    return res.redirect('/?error=User does not exist');
                }

                Thread.findOne({ users: { $all: [currentUser,otherUser]}})
                    .then(existingThread => {
                        if(!existingThread){
                            Thread.create({users: [currentUser,otherUser], dateCreated: Date.now()})
                                .then(newThread => {
                                    req.user.otherUsers.push(otherUserObj._id); //currently logged
                                    otherUserObj.otherUsers.push(req.user._id); //other users
                                    Promise.all([req.user.save(), otherUserObj.save()]);
                                })
                        }
                        return res.redirect(`/thread/${otherUser}`);
                    })
            })
    }
};
