var User = require('../models/user.js');
const jwt = require('jsonwebtoken');
var fs = require('fs')
var emailService = require('../services/sendEmail.js');

exports.register = (req, res) => {
  let params = req.body
  if (params.email != null && params.email != undefined && params.email != "") {
    if (params.name != null && params.name != undefined && params.name != "") {
      if (params.password != null && params.password != undefined && params.password != "") {
        var num
        if (process.env.SEND_EMAIL == "true") {
          num = Math.floor(Math.random() * (999999 - 100000) + 100000);
        } else {
          num = 123456
        }
        params.verificationCode = num
        var date = new Date();
        params.verificationCodeTime = date.getTime();
        var activationLink = process.env.BASE_URL + `/verify?c=${num}&e=${params.email}&g=other`
        var headingText = "Welcome to "
        var verifyText = "for email verification"
        var buttonText = "Verify Email"
        const templatePath = "mail_template/welcomeEmail.html";
        let templateContent = fs.readFileSync(templatePath, "utf8");
        templateContent = templateContent.replace("##ACTIVATION_CODE##", num);
        templateContent = templateContent.replace("##ACTIVATION_LINK##", activationLink)
        templateContent = templateContent.replace("##HEADING_TEXT##", headingText)
        templateContent = templateContent.replace("##VERIFY_TEXT##", verifyText)
        templateContent = templateContent.replace("##BUTTON_TEXT##", buttonText)
        let subject = "Almost there! Verify your email addres"
        User.findOne({ email: params.email }).exec((err, found) => {
          if (err) {
            res.status(500).send({ success: false, message: "Something went wrong", error, err })
          } else {
            if (found) {
              if (found.isDeleted) {
                found.name = params.name
                found.password = params.password
                found.isDeleted = false
                found.verificationCode = num
                found.verificationCodeTime = date.getTime()
                found.save((error, updated) => {
                  if (error) {
                    res.status(500).send({ success: false, message: "Internal server error", error: error })
                  } else {
                    emailService.sendEmail(params.email, subject, "", templateContent).then(sent => {
                      updated.verificationCode = undefined
                      updated.password = undefined
                      res.status(200).send({ success: true, message: "please verify your email", user: updated })
                    }).catch(e => res.status(500).send({ success: false, message: "Internal server error", error: e }))
                  }
                })
              } else {
                res.status(403).send({ success: false, message: "User already exists" })
              }
            } else {
              User.create(params).then(result => {
                if (result) {
                  emailService.sendEmail(params.email, subject, "", templateContent).then(sent => {
                    result.verificationCode = undefined
                    result.password = undefined
                    res.status(200).send({ success: true, message: "please verify your email", user: result })
                  }).catch(e => res.status(500).send({ success: false, message: "Internal server error1", error: e }))
                } else {
                  res.status(500).send({ success: false, message: "Internal server error2" })
                }
              }).catch(err => res.status(500).send({ success: false, message: "Internal server error", error: err }))
            }
          }
        })
      } else {
        res.status(403).send({ success: false, message: "Passworrd required" })
      }
    } else {
      res.status(403).send({ success: false, message: "Name required" })
    }
  } else {
    res.status(403).send({ success: false, message: "Email required" })
  }

}

exports.verifyEmail = (req, res) => {
  let params = req.body
  if (params.verificationCode != null && params.verificationCode != "" && params.verificationCode != undefined) {
    if (params.email != null && params.email != "" && params.email != undefined) {
      var momentOfTime = new Date();
      myTimeSpan = 10 * 60 * 1000; // 10 minutes in milliseconds
      momentOfTime.setTime(momentOfTime.getTime() - myTimeSpan);
      var currentTime = momentOfTime.getTime();
      User.findOne({ email: params.email }).select("+verificationCode").select("+verificationCodeTime").exec((err, user) => {
        if (err) {
          res.status(500).send({ success: false, message: "Internal server error", error: err })
        } else {
          if (user) {
            if (user.verificationCode == params.verificationCode) {
              if (user.verificationCodeTime > currentTime) {
                user.isVerified = true
                user.verificationCode = "00"
                user.save(async (err, updated) => {
                  if (err) {
                    res.status(500).send({ success: false, message: "Internal server error", error: err })
                  } else {
                    var token = jwt.sign({ user: user }, process.env.jwtsecret, { expiresIn: 1000000 });
                    res.status(200).send({ success: true,message:"email verified", token: 'JWT ' + token, user: updated })
                  }
                })
              } else {
                res.status(403).send({ success: false, message: "OTP is expired" })
              }
            } else {
              res.status(403).send({ success: false, message: "OTP didn't match" })
            }

          } else {
            res.status(400).send({ success: false, message: "User not found" })
          }
        }
      })
    } else {
      res.status(403).send({ success: false, message: "please provide email" })
    }
  } else {
    res.status(403).send({ success: false, message: "please provide verification code" })
  }
}

exports.forgotPassword = (req, res) => {
  let params = req.body
  if (params.email != null && params.email != "" && params.email != undefined) {
    User.findOne({ email: params.email }).exec((err, found) => {
      if (err) {
        res.status(500).send({ success: false, message: "Internal server error", error: err })
      } else {
        if (found) {
          var num
          if (process.env.SEND_EMAIL == "true") {
            num = Math.floor(Math.random() * (999999 - 100000) + 100000);
          } else {
            num = 123456
          }
          var date = new Date();
          var timeInMilliseconds = date.getTime();
          var activationLink = process.env.BASE_URL + `/verify?c=${num}&e=${params.email}&g=forgot`
          var headingText = "Need a new way in ?"
          var verifyText = "to reset password"
          var buttonText = "Change your password"
          const templatePath = "mail_template/email.html";
          let templateContent = fs.readFileSync(templatePath, "utf8");
          templateContent = templateContent.replace("##ACTIVATION_CODE##", num);
          templateContent = templateContent.replace("##ACTIVATION_LINK##", activationLink)
          templateContent = templateContent.replace("##HEADING_TEXT##", headingText)
          templateContent = templateContent.replace("##VERIFY_TEXT##", verifyText)
          templateContent = templateContent.replace("##BUTTON_TEXT##", buttonText)
          let subject = "Reset your password"
          emailService.sendEmail(params.email, subject, "", templateContent).then(sent => {
            found.verificationCode = num
            found.verificationCodeTime = timeInMilliseconds
            found.save((err, updated) => {
              if (err) {
                res.status(500).send({ success: false, message: "Internal server error", error: err })
              } else {
                updated.verificationCode = undefined
                res.status(200).send({ success: true, message: "Please check your email", user: updated })
              }
            })
          }).catch(error => res.status(500).send({ success: false, message: " Internal server error", error: error }))
        } else {
          res.status(400).send({ success: false, message: "User not found" })
        }
      }
    })
  } else {
    res.status(403).send({ success: false, message: "Please provide Email" })
  }
}

exports.resendOTP = (req, res) => {
  let params = req.body
  if (params.email != null && params.email != "" && params.email != undefined) {
    User.findOne({ email: params.email }).exec((err, found) => {
      if (err) {
        res.status(500).send({ success: false, message: "Internal server error", error: err })
      } else {
        if (found) {
          var num
          if (process.env.SEND_EMAIL == "true") {
            num = Math.floor(Math.random() * (999999 - 100000) + 100000);
          } else {
            num = 123456
          }
          var date = new Date();
          var timeInMilliseconds = date.getTime();
          var activationLink = process.env.BASE_URL + `/verify?c=${num}&e=${params.email}&g=other`
          var headingText = "Welcome to "
          var verifyText = "for email verification"
          var buttonText = "Verify Email"
          const templatePath = "mail_template/welcomeEmail.html";
          let templateContent = fs.readFileSync(templatePath, "utf8");
          templateContent = templateContent.replace("##ACTIVATION_CODE##", num);
          templateContent = templateContent.replace("##ACTIVATION_LINK##", activationLink)
          templateContent = templateContent.replace("##HEADING_TEXT##", headingText)
          templateContent = templateContent.replace("##VERIFY_TEXT##", verifyText)
          templateContent = templateContent.replace("##BUTTON_TEXT##", buttonText)
          let subject = "Almost there! Verify your email addres"
          emailService.sendEmail(params.email, subject, "", templateContent).then(sent => {
            found.verificationCode = num
            found.verificationCodeTime = timeInMilliseconds
            found.save((err, updated) => {
              if (err) {
                res.status(500).send({ success: false, message: "Internal server error", error: err })
              } else {
                updated.verificationCode = undefined
                res.status(200).send({ success: true, message: "Please check your email", user: updated })
              }
            })
          }).catch(error => res.status(500).send({ success: false, message: " Internal server error", error: error }))
        } else {
          res.status(400).send({ success: false, message: "User not found" })
        }
      }
    })
  } else {
    res.status(403).send({ success: false, message: "Please provide Email" })
  }
}

exports.authenticate = (req, res) => {
  if (req.body.email != null && req.body.email != "") {
    User.findOne({ email: req.body.email }).select('+password').exec(function (err, user) {
      if (err) {
        res.status(500).send({ success: false, message: "something went wrong", error: err })
      } else if (user) {
        if (user.comparePassword(req.body.password, function (err, isMatch) {
          if (isMatch && !err) {
            user.password = undefined;
            var token = jwt.sign({ user: user }, process.env.jwtsecret, { expiresIn: 1000000 });
            res.status('200').send({ success: true, token: 'JWT ' + token, user: user });

          } else {
            res.status(401).send({ success: false, message: 'password did not match.' });
          }
        }));
      } else {
        res.status(401).send({ success: false, message: 'user not found' })
      }
    });
  } else {
    res.status(403).send({ message: "Please enter email address" });
  }
}

exports.updatePassword = (req, res) => {
  let params = req.body
  if (params.newPassword != null && params.newPassword != "" && params.newPassword != undefined) {
    User.findOne({ _id: req.user._id }).exec((err, user) => {
      if (err) {
        res.status(500).send({ success: false, message: "Internal server error", error: err })
      } else {
        if (user) {
          user.password = params.newPassword
          user.save(async (err, updated) => {
            if (err) {
              res.status(500).send({ success: false, message: "Internal server error", error: err })
            } else {
              var token = jwt.sign({ user: user }, process.env.jwtsecret, { expiresIn: 1000000 });
              res.status(200).send({ message: true, message: "Password updated successfully", token: 'JWT ' + token, user: updated })
            }
          })
        } else {
          res.status(400).send({ success: false, message: "User not found" })
        }
      }
    })
  } else {
    res.status(403).send({ success: false, message: "please provide new password" })
  }
}

exports.changePassword = (req, res) => {
  let params = req.body
  if (params.oldPassword != undefined && params.oldPassword != null && params.oldPassword != "") {
    if (params.newPassword != undefined && params.newPassword != null && params.newPassword != "") {
      User.findOne({ _id: req.user._id, isDeleted: false }).select('+password').exec(function (err, user) {
        if (err) {
          res.status(500).send({ success: false, message: "Internal server erorr", error: err })
        } else if (user) {
          if (user.comparePassword(params.oldPassword, function (err, isMatch) {
            if (isMatch && !err) {
              user.password = params.newPassword
              user.save((err, updated) => {
                if (err) {
                  res.status(500).send({ success: false, message: "Internal server error", error: err })
                } else {
                  if (updated) {
                    var token = jwt.sign({ user: updated }, process.env.jwtsecret, { expiresIn: 1000000 });
                    res.status(200).send({ success: true, message: "Password successfully changed", token: 'JWT ' + token, user: updated })
                  } else {
                    res.status(400).send({ success: false, message: "User not found" })
                  }
                }
              })
            } else {
              res.status(401).send({ success: false, message: 'password did not match with old password' });
            }
          }));
        } else {
          res.status(401).send({ success: false, message: 'user not found' })
        }
      });
    } else {
      res.status(403).send({ success: false, message: "Please provide new password" })
    }
  } else {
    res.status(403).send({ success: false, message: "Please provide old password" })
  }
}

exports.updateUser = (req, res) => {
  let params = req.body
  if (params != undefined && params != "" && params != null) {
    User.findOne({ _id: req.user._id }).exec((err, found) => {
      if (err) {
        res.status(500).send({ success: false, message: "Internal server error", error: err })
      } else {
        if (found) {
          if (params.email) {
            params.email = params.email.split(" ").join("");
            if (params.email != found.email) {
              var num
              if (process.env.SEND_EMAIL == "true") {
                num = Math.floor(Math.random() * (999999 - 100000) + 100000);
              } else {
                num = 123456
              }
              params.verificationCode = num
              var date = new Date();
              params.verificationCodeTime = date.getTime();
              params.isVerified = false
              var activationLink = process.env.BASE_URL + `/verify?c=${num}&e=${params.email}&g=other`
              var headingText = "Welcome to "
              var verifyText = "for email verification"
              var buttonText = "Verify Email"
              const templatePath = "mail_template/welcomeEmail.html";
              let templateContent = fs.readFileSync(templatePath, "utf8");
              templateContent = templateContent.replace("##ACTIVATION_CODE##", num);
              templateContent = templateContent.replace("##ACTIVATION_LINK##", activationLink)
              templateContent = templateContent.replace("##HEADING_TEXT##", headingText)
              templateContent = templateContent.replace("##VERIFY_TEXT##", verifyText)
              templateContent = templateContent.replace("##BUTTON_TEXT##", buttonText)
              let subject = "Almost there! Verify your email addres"
              emailService.sendEmail(params.email, subject, "", templateContent)
            }
          }
          User.updateOne({ _id: req.user._id }, params, (error, updated) => {
            if (error) {
              res.status(500).send({ success: false, message: "Internal server error", error: error })
            } else {
              User.findOne({ _id: req.user._id }).exec(async (err, user) => {
                if (err) {
                  res.status(500).send({ success: false, message: "Internal server error", error: err })
                } else {
                  if (user) {
                    var token = jwt.sign({ user: user }, process.env.jwtsecret, { expiresIn: 1000000 });
                    res.status(200).send({ success: true, message: "User updated successfully", token: 'JWT ' + token, user: user })
                  } else {
                    res.status(400).send({ success: false, message: "User not found" })
                  }
                }
              })
            }
          })
        } else {
          res.status(400).send({ success: true, message: "User not found" })
        }
      }
    })
  } else {
    res.status(403).send({ success: false, message: "Params required" })
  }
}

exports.pendingUsers= (req,res) =>{
  if(req.user.role == "admin"){
    User.find({role:'user', isVerified:true,isRejected: { $exists: false }}).exec((err,users) => {
      if(err){
        res.status(500).send({success: false, message :"Internal server error", error:err})
      }else{
        res.status(200).send({success: true, users: users})
      }
    })
  }else{
    res.status(401).send({success: false, message: "You are not authorised for this action"})
  }
}

exports.approveAdmin = (req,res) =>{
  var params = req.body
  if(req.user.role == 'admin'){
    User.updateOne({_id:params.userId},{role: "admin"}).exec(err=>{
      if(err){
        res.status(500).send({success: false, message:"Internal server error", error:err })
      }else{
        res.status(200).send({success: true, message: "User is promoted to admin"})
      }
    })
  }else{
    res.status(401).send({success: false, message: "You are not authorised for this action"})
  }
}

exports.rejectVerification = (req, res) => {
  var params = req.body
  if (params.userId != null && params.userId != "" && params.userId != undefined) {
    User.updateOne({ _id: params.userId }, { isRejected: Date.now() }).exec((err, modified) => {
      if (err) {
        res.status(500).send({ success: false, message: "Internal server error", error: err })
      } else {
        res.status(200).send({ success: true, message: "User is rejected", result: modified })
      }
    })
  } else {
    res.status(403).send({ success: false, message: "User id required" })
  }
}