//Observer Module Pattern
class EventObserver {
  constructor() {
    this.observers = [];
  }
  subscribe(fn) {
    this.observers.push(fn);
    console.log(`You have subscribed to the function ${fn.name}`);
  }

  unsubscribe(fn) {
    this.observers = this.observers.filter((item) => {
      item !== fn;
    });
    console.log(`You have unsubscribed from the function ${fn.name}`);
  }

  fire() {
    this.observers.forEach(function (item) {
      item.call();
    });
  }
}

const click = new EventObserver();

document.querySelector(".sub-ms").addEventListener("click", () => {
  click.subscribe(getMilliSeconds);
});

document.querySelector(".unsub-ms").addEventListener("click", () => {
  click.unsubscribe(getMilliSeconds);
});

document.querySelector(".fire").addEventListener("click", () => {
  click.fire();
});

const getMilliSeconds = function () {
  console.log(`Time: ${new Date()}`);
};
