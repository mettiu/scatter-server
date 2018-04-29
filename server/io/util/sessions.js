class Sessions {
  constructor() {
    if (!Sessions.instance) {
      this.userIds = {};
      this.sessionIds = {};
      Sessions.instance = this;
    }

    return Sessions.instance;
  }

  add(userId, sessionId) {
    if (!this.userIds[userId]) {
      this.userIds[userId] = [];
    }
    this.userIds[userId].push(sessionId);

    this.sessionIds[sessionId] = userId;
  }

  remove(sessionId) {
    const userId = this.sessionIds[sessionId];

    const index = this.userIds[userId].indexOf(sessionId);
    this.userIds[userId].splice(index, 1);
    if (this.userIds[userId].length === 0) {
      delete this.userIds[userId];
    }

    delete this.sessionIds[sessionId];
  }

  getSessions(userId) {
    return this.sessionIds[userId];
    // return this.userIds.find(element => element.key === userId);
  }

  getUserId(sessionId) {
    return this.userIds[sessionId];
  }
}

const instance = new Sessions();
Object.freeze(instance);

module.exports = instance;
