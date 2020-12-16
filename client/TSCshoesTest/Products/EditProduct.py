from selenium import webdriver
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.support.ui import Select

chromdriver = "/Users/sufianali/tscshoesproject/client/Drivers/chromedriver"
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
emailfield.send_keys(Keys.COMMAND+ "a")
emailfield.send_keys(Email)

#passwordfield

passwordfield = driver.find_element_by_name("password")
passwordfield.click()
passwordfield.send_keys(Keys.COMMAND+ "a")
passwordfield.send_keys(Password)

#Login Button
loginbtn = driver.find_element_by_xpath("//button[contains(text(),'Login')]")
loginbtn.click()


driver.implicitly_wait(10)

#Navigate to the products page

Products = driver.find_element_by_xpath("//p[contains(text(),'Products')]")
Products.click()

#Click on the edit button

index = "1"
edit = driver.find_element_by_xpath("//body/div[@id='root']/div[1]/div[3]/div[2]/div[2]/div[1]/div[1]/div[3]/div[{}]/div[1]/div[5]/span[1]/button[1]".format(index))
edit.click()

#Edit the form
name = driver.find_element_by_name("name")
name.send_keys(Keys.COMMAND+ "a")
name.send_keys(shoename)

price = driver.find_element_by_name("price")
price.send_keys(Keys.COMMAND + "a")
price.send_keys(shoeprice) 

quantity= driver.find_element_by_name("quantity")
quantity.send_keys(Keys.COMMAND + "a")
quantity.send_keys(shoequantity) 

#Save changes
save = driver.find_element_by_xpath("//button[contains(text(),'Save')]")
save.click()