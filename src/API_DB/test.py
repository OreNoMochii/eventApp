import requests

BASE = "http://127.0.0.1:5000/"

# response1 = requests.post(BASE + '/event/create/', { "eventName" : "testEventName", "eventLocation" : "Paris", "eventStartTime" :"2020/11/20" , "eventEndTime" :"2020/11/30"}) 
# response = requests.delete(BASE + 'event/0') 

response= requests.post(BASE + '/signup/unsign/2882', {"userMail":"farrabi.sobhi@outlook.fr","eventId":"2882","eventName":"Party at the duplex"})
response= requests.post(BASE + '/signup/farrabi',{"userMail":"farrabi.sobhi@outlook.fr","eventId":44341,"eventName":"tokyo annex","eventStartDate":"2020/11/20","eventEndDate":"2020/11/21"}	)
# response = requests.get(BASE + '/signedup/farrabi.sobhi@outlook.fr')
# response = requests.get((BASE + '/user/login/farrabi.sobhi@outlook.fr'))
# response = requests.get((BASE + '/signedup/farrabi.sobhi@zurich.co.jp'))
# response = requests.get((BASE + '/event/listAllEvents/'))


print(response.json())