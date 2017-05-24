module.exports = {
  before: function(client) {
    console.log('App takes a little while to boot. Waiting for 30 seconds ...')
    client.pause(30000).resizeWindow(1024, 636);
  },

  // The app defaults to just listing all the albums on page
  "./complete/app-v5.js": function(client) {
    client.url("http://localhost:3000").waitForElementVisible(".ui.segment", 5000);

    client
      .assert.elementPresent("input")
      .assert.elementPresent(".ui.primary.button")

    client.
      setValue('input[type=text]', 'message1')

    client.
      click('.primary.button')

    client.
      expect.element('.comment').text.to.equal('message1');

    client.
      expect.element('input[type=text]').text.to.equal('');

    client.
      setValue('input[type=text]', 'message2')

    client.
      click('.primary.button')

    client.
      expect.element('div.ui.comments > div:nth-child(1)').text.to.equal('message1')
    client.
      expect.element('div.ui.comments > div:nth-child(2)').text.to.equal('message2')
    client.
      click('div.ui.comments > div:nth-child(1)')
    client.
      expect.element('div.ui.comments > div:nth-child(1)').text.to.equal('message2')
  },

  after: function(client) {
    client.end();
  }
};
