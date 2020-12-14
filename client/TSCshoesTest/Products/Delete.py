from selenium import webdriver
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.support.ui import Select

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

#Navigate to the products page

Products = driver.find_element_by_xpath("//p[contains(text(),'Products')]")
Products.click()

#Click on the delete button
#index ="2"
#delete = driver.find_element_by_id("//body/div[@id='root']/div[1]/div[3]/div[2]/div[2]/div[1]/div[1]/div[3]/div[{}]/div[1]/div[5]/span[1]/button[2]".format(index))
#delete.click()