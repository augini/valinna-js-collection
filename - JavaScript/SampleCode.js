//Factory pattern in JavaScript
function FactorySet() {

  this.createUser  = (name, type) => {
      let member ;

      if(type === 'Basic'){
          member = new BasicMembership(name)
      }else if(type === 'Standard'){
          member = new StandardMembership(name)
      }else if (type === 'Premium'){
          member = new PremiumMembership(name)
      }

      member.type = type

      member.define = function() {
          console.log(`${this.name} ( ${this.type }) : ${this.price}$`);
      }
      
      return member
  }
}

function BasicMembership (name) {
  this.name = name
  this.price = '5'
}

function StandardMembership (name) {
  this.name = name
  this.price = '15'
}

function PremiumMembership (name) {
  this.name = name
  this.price = '50'
}

const members = []
const factory = new FactorySet()

members.push(factory.createUser('Paulo', 'Premium'))
members.push(factory.createUser('Eric', 'Basic'))
members.push(factory.createUser('Max', 'Standard'))


console.log(members);

members.forEach((member) => {
  member.define()
})