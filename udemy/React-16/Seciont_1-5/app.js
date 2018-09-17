function Person(props) {
  return (
    <div className="person">
      <h1>{props.name}</h1>
      <p>Your Age: {props.age}</p>
    </div>
  );
}

var app = (
  <div>
    <Person name="Max" age="28"/>
    <Person name="Menu" age="28"/>
  </div>
);

ReactDOM.render(app, document.querySelector('#app'));
