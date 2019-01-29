# Ripple - client

## Enviroment
| Name | Version |
|:------:|:------:|
| Nodejs | v10.14.2|
| npm | 6.4.1|
| MongoDB| Community Server 4.0.5|
| MacOS | 10.14.2 Mojave|
| Windows | Windows 10 version: 1089|

## Process for running app
1. Make sure you installed MongoDB successfully, and it is running.
2. Unzip the Server.zip and client.zip into a different folder.
3. Use VSCode or other editors to load the server and client codes.
4. Open terminal to run a server at first then the client with the command `npm i && npm start`.
5. It will automatically open a webpage to access `localhost:3000`

## Description

## Dependencies

Except the `react` and `react-dom`, these dependencies applied: 
| Name | Usage |
|:------:|:------:|
| react-router & react-router-dom | Implement the routers for Main page and Dashboard page |
| react-select | For the dropdown |
| request & request-promise | Send request and receive the response that allow me to use async/await |
| socket.io-client | Establish the socket io client|

### Design
A component named Ripple created that to generate the dot with ripple effection when mouse/touch drag or click. 

It draws a circle div when mouse/touch trigger the down/start event. The circle div - Ripple will move with the mouse. If mouse/touch release, the circle will be set to invisible by changing the size. 

By tracking the mouse actions, if the `Record` button be clicked, the mouse position and its action, like mouseDown, will be recorded with its coordinates, color into the component store. If the stop button, transferred from the record button, be clicked. Then the record in the store will be sent to the server by HTTP request.

At this moment, a request for fetching the records will send to update the records information. Based on it, the dropdown will show each name of record in that list. 

If you click the `Replay`, the replaying process will not stop until it is finished or failed. The setTimeout used to generate the sequence of showing the actions with Ripple. If the component is unmounted, the setTimeouts will be clear.

When the checkbox `Use test case` is checked, it means the test color sequence will replace the original one. If the series in the record does not satisfy the real sequence, a red warning message will show at the bottom of the page.

Besides the warning message, a link that to open the dashboard page is there. It will open another page that accesses the message through the Socket from the server to show the testing result.

### Result
The app satisfies the requirement from section 3 to section 6.

It does not pay attention to the corner cases, error handling, and best practice.
> If the record is for the mobile size page, it does not satisfy the desktop size page


