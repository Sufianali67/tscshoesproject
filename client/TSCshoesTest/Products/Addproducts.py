#This testcase is to add a new product to the app

from selenium import webdriver
from selenium.webdriver.common.keys import Keys



chromdriver = "C:/Users/Quence/Desktop/Selenium/chromedriver_win32/chromedriver.exe"
driver = webdriver.Chrome(chromdriver)
driver.get("http://localhost:3000/admin/login")
driver.maximize_window()

#data to populate the form
Email = "testhaider@gmail.com"
Password = "123"
shoename = "Snickers"
shoeprice = "100"
shoequantity = "10"

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

#Open product popup
AddProducts = driver.find_element_by_xpath("//button[contains(text(),'Add Product')]")
AddProducts.click()

#Fill up the form
name = driver.find_element_by_name("name")
name.send_keys(shoename)

price = driver.find_element_by_name("price")
price.send_keys(shoeprice) 

quantity= driver.find_element_by_name("quantity")
quantity.send_keys(shoequantity) 

#image = driver.find_element_by_xpath("//body/div[2]/div[1]/div[1]/div[1]/div[1]/div[2]/div[1]/div[1]/div[1]/div[1]/form[1]/div[4]")
#image.click()

#image.send_keys("C:/Users/Quence/Desktop/snickersimage.jpg")