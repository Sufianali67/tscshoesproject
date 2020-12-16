from selenium import webdriver
from selenium.webdriver.common.keys import Keys

chromdriver = "/Users/sufianali/tscshoesproject/client/Drivers/chromedriver"
driver = webdriver.Chrome(chromdriver)
driver.get("http://localhost:3000/home/shoes")
driver.maximize_window()

quantity="2"

#Add quantity field
index = "2"
quantityfield = driver.find_element_by_xpath("//body/div[@id='root']/div[1]/div[3]/div[2]/div[2]/div[1]/div[1]/div[{}]/div[2]/form[1]/div[1]/div[1]/div[1]/input[1]".format(index))
quantityfield.send_keys(Keys.CONTROL + "a")
quantityfield.send_keys(quantity)

#Add to cart button
addproducttocart = driver.find_element_by_xpath("//body/div[@id='root']/div[1]/div[3]/div[2]/div[2]/div[1]/div[1]/div[{}]/div[2]/form[1]/button[1]".format(index))
addproducttocart.click()

#view cart
viewcart = driver.find_element_by_xpath("//p[contains(text(),'View Cart')]")
viewcart.click()

#Proceed
proceed = driver.find_element_by_xpath("//button[contains(text(),'Proceed')]")
proceed.click()

#Fill checkout form
ordername  = "Sufian"
orderemail = "sufian@test.com"
orderaddress = "Brooklyn Newyork"

name = driver.find_element_by_name("name")
name.send_keys(Keys.CONTROL + "a")
name.send_keys(ordername)

email = driver.find_element_by_name("email")
email.send_keys(Keys.CONTROL + "a")
email.send_keys(orderemail)

address = driver.find_element_by_name("address")
address.send_keys(Keys.CONTROL + "a")
address.send_keys(orderaddress)

#Checkout button

checkoutbtn = driver.find_element_by_xpath("//button[contains(text(),'Checkout')]")
checkoutbtn.click()
