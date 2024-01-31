import jwt from 'jsonwebtoken';

const SECRET_KEY = '123456789'; // Should be a long, random string in a real application

export async function registerUsers(email, password, password2) {
    console.log(email, password, password2);

    const payload = {
        email: email,
        password: password,
        password2: password2
    };

    const secret = SECRET_KEY;
    const token = jwt.sign(payload, secret, { expiresIn: '1h' });
    console.log(token);
}


// In this useEffect, we use an interval to control the character-by-character display and removal of words. Here's a step-by-step breakdown:
// If the word is not fully displayed (!isWordDisplayed) and we haven't reached the end of the current word (currentIndex < currentWord.length), we add the current character to the displayText and increment the currentIndex.
// If the word is not fully displayed, and we have reached the end of the current word, we set isWordDisplayed to true. This indicates that the current word is fully displayed.
// If isWordDisplayed is true, we clear the interval using clearInterval(intervalId). Then, we reset isWordDisplayed to false and use setTimeout to wait for 500ms before performing the following actions:
// Clear the displayText.
// Reset currentIndex to 0.
// Update currentWordIndex to move to the next word in the words array (with wrapping around to the first word using (prevIndex + 1) % words.length).
// Here, we return a cleanup function that clears the interval when the component unmounts or when any of the dependencies 
// (currentWord, currentIndex, currentWordIndex, isWordDisplayed, words) change.
