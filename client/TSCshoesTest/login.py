from selenium import webdriver
from selenium.webdriver.common.keys import Keys

chromdriver = "/Users/sufianali/tscshoesproject/client/Drivers/chromedriver"
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
loginbtn = driver.find_element_by_xpath("//button[contains(text(),'Login')]")
loginbtn.click()