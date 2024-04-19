Feature: User can create a box, add participants and start the drow

Scenario: User logs in and create a box
Given user is on santa login page
When user logs in
Then user is on dashboard page
Then user creates a box
Then user picks an icon
Then user sets a money limit
When user is on box settings page
Then user finishes a box creating
Then user sees a created box 

Scenario: User gets an invitation link for participants
Given user sees a created box
When user clicks main button
Then user can get an invitation link

Scenario: User can add participants by input form
Given user is on santa login page
When user logs in
Then user go to current box dashboard page
Then user can add participants in form from table
    | name |  email |
    | Konstantin Kosta | konstantin.gdansk+3@gmail.com |
    | Konst | konstantin.gdansk+4@gmail.com |

Scenario: User can add participants by invitation link
Given user use an invitation link
When user clicks main button
And user sees Войдите button
Then inv-user logs in with "konstantin.gdansk+2@gmail.com" and "XX3098"
Then user create a participants card

Scenario: Creator of the box is able to start the drow
Given user is on santa login page
When user logs in
Then user go to current box dashboard page
Then user go to drow
Then user starts a drow