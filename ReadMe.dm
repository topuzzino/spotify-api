Here is what I think you should do until the Spotify API works correctly again:

1. When you show a new set of results, always show the "more" button.

2. When the user clicks the "more" button, you should

   a. remove the "more" button the user clicked and

   b. attempt to get more using a url that you generate. The url would be formed using the same q and type parameters you used for the initial request but with an additional offset parameter. The value in the offset should be the number of results you've gotten thus far. Assuming you keep the default limit of 20, the first time the "more" button is clicked, the value of the offset parameter should be 20. The second time the "more" button is clicked, the offset should be 40. And so on. You can get the correct offset by counting the result elements you have put into the page already (assuming you are not discarding the results that have no image).

3. If the response to your attempt to get more contains an empty items array, that means you've reached the limit. Do not update the display at all since there are no more results to show and the "more" button the user clicked is already gone.

After you do this, you'd just have to change the first step when the API starts working correctly again. You would change it to only show the "more" button if next is not null.
I am so sorry for this inconvenience!
