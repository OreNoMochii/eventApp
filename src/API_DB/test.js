// const fetch = require("node-fetch");
//  function test() {
//         const res= []
//         // const user = { "userMail":'test', "userFirstName" : 'userFirstNametest', "userLastName": 'userLastNametest', "userPassword": 'userPasswordtest'};
//          fetch("http://127.0.0.1:5000//event/listAllEvents/", {
//           method: "GET",
//           headers: {
//             "Content_Type": "application/json"
//           },
//                     }).then(response => response.json().then((function (data){return console.log(data)})))
        
//       }

// console.log(test())

var test = [ { eventId: 37893,
    eventName: '9',
    eventLocation: '10',
    eventStartTime: '13',
    eventStartDate: '12',
    eventEndDate: '14',
    eventEndTime: '15',
    eventCreator: '11',
    updateDate: '11/22/2020, 10:52:13',
    eventDescription: '16' },
  { eventId: 38299,
    eventName: '1',
    eventLocation: '2',
    eventStartTime: '5',
    eventStartDate: '4',
    eventEndDate: '6',
    eventEndTime: '7',
    eventCreator: '3',
    updateDate: '11/22/2020, 10:49:32',
    eventDescription: '8' } ].map((event) =>(
            {
              title: event.eventId,
              start: event.eventStartDate,
              end: event.eventEndDate,
              resource: event.eventCreator
            }))

console.log(test)