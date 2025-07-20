import style from "./style.module.css"

function Connections() {

  return (<div className={style.page}>
    <h1>Connections</h1>
    <h4>To-Do:</h4>
    <ul>
      <li>Initialize connection to the AI agent (API key, authentication, etc.)</li>
      <li>Fetch Existing Connections</li>
      <li>Display Connections in UI</li>
      <li>Add a “Disconnect” button to each connection card</li>
      <li>Create New Connection</li>
      <li>Display any generated AI insights or suggestions in the modal</li>
    </ul>
  </div>
  )
}

export default Connections