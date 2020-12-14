#This is a test case for signup a new user and enter code for validation
#Once a user signup successfully for the next time we need to change the name variable given below

from selenium import webdriver
from selenium.webdriver.common.keys import Keys

chromdriver = "C:/Users/Quence/Desktop/Selenium/chromedriver_win32/chromedriver.exe"
driver = webdriver.Chrome(chromdriver)
driver.get("http://localhost:3000/signup")
driver.maximize_window()

#Data to populate the form
name = "noman20"
Email = (name+"@gmail.com")
Password = "123"
Con_Password = "123"
emailverificationcode = "123456"


# Name field

namefield = driver.find_element_by_name("name")
namefield.click()
namefield.send_keys(name)

# Email field

emailfield = driver.find_element_by_name("email")
emailfield.click()
emailfield.send_keys(Email)

#Password Field

password = driver.find_element_by_name("password")
password.click()
password.send_keys(Password)

#Confirm password Field

c_password = driver.find_element_by_name("confirmPassword")
c_password.click()
c_password.send_keys(Con_Password)

#Signup button

signup_btn = driver.find_element_by_name("signup_btn")
signup_btn.click()

#Validation for the entering code
#Add code "123456"

driver.implicitly_wait(10)

#Code Field
verificationcode = driver.find_element_by_name("verificationCode")
verificationcode.click()
verificationcode.send_keys(emailverificationcode)

#Send button
sendbtn = driver.find_element_by_id("sendbtn")
sendbtn.click()
