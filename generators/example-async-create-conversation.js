function* createConversation(string) {
  yield setInterval(function () {
    console.log(
      string === 'english'
        ? 'hello there'
        : 'gibberish'
    );
  }, 3000);
}
console.log(createConversation('english').next());
