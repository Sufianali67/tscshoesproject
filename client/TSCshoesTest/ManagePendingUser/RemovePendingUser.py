#This test case is to validate the pending user
#This test case will navigate to the admin dashboard and allow users
from selenium import webdriver
from selenium.webdriver.common.keys import Keys
chromdriver = "C:/Users/Quence/Desktop/Selenium/chromedriver_win32/chromedriver.exe"
driver = webdriver.Chrome(chromdriver)
driver.get("http://localhost:3000/admin/login")
driver.maximize_window()

#data to populate the form
Email = "testhaider@gmail.com"
Password = "123"

#Login form

#Email field
emailfield = driver.find_element_by_name("email")
emailfield.click()
emailfield.send_keys(Keys.CONTROL + "a")
emailfield.send_keys(Email)

#passwordfield

passwordfield = driver.find_element_by_name("password")
passwordfield.click()
passwordfield.send_keys(Keys.CONTROL + "a")
passwordfield.send_keys(Password)

#Login Button
loginbtn = driver.find_element_by_id("loginbtn")
loginbtn.click()

driver.implicitly_wait(10)

#Navigate to the pending user
manageuserlink = driver.find_element_by_xpath("//p[contains(text(),'Manage Pending Users')]")
manageuserlink.click()

#Add user
index="1"
adduser = driver.find_element_by_xpath("//*[@id='root']/div/div[3]/div[2]/div[4]/div/div[1]/div[3]/div[{}]/div/div[5]/center/div/button[2]".format(index))
adduser.click()
