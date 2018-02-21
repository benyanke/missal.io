# Missal

**fyi - readme is horribly out of date. discard me.**

**also - ash wednesday is horribly broken. This due to the frontend, backend is correct**

MyMissal is a Catholic Sunday hand missal web app for the Extraordinary Form, designed first for mobile devices, but also for computers.



DB Structure
 - Types of days:
   - Static days
   - Relative days - based on anchor days
   - Anchor days - calculated by formula
   
   
Anchor days have a 'length', so that the range can be calculated.


Use JS like this to make the SPA easier

function goTo(page, title, url) {
  if ("undefined" !== typeof history.pushState) {
    history.pushState({page: page}, title, url);
  } else {
    window.location.assign(url);   
  }
}

goTo("another page", "example", 'example.html');

