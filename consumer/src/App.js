import React from "react";
import "./App.css";
import OpenAPIClientAxios from "openapi-client-axios";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      rooms: []
    };
  }

  async componentDidMount() {
    const api = new OpenAPIClientAxios({
      definition: "http://localhost:9000/openapi.json"
    });
    this.client = await api.init();
    const { data } = await this.client.getRooms();
    this.setState({ rooms: data });
  }

  checkin = async () => {
    const input = document.getElementById("roomnumber");
    const roomNumber = input.value;
    const { data } = await this.client.checkIn({ roomNumber });
    this.setState({ rooms: [...this.state.rooms, data] });
  };

  render() {
    const { rooms } = this.state;
    return (
      <div className="App">
        <h1>Clarion Hotellin vieraat</h1>
        {rooms.map(({ roomNumber, guest }) => (
          <div key={roomNumber}>
            <p>
              Huonenumero: <strong>{roomNumber}</strong>, Vieras:{" "}
              {guest.firstName} {guest.lastName}
            </p>
          </div>
        ))}
        <input id="roomnumber" />
        <button onClick={this.checkin}>Check-in!</button>
      </div>
    );
  }
}

export default App;
