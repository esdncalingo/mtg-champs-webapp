// import { useEffect, useState } from "react"
// import { fetchDeck } from "../../helpers/apicall"

function RandomCard(props: any) {

  // const [ deck, setDeck ] = useState([])

  // useEffect(()=> {
  //   loadDeckList()
  // }, [])
  
  // const loadDeckList = async () => {
  //   let decklist = await fetchDeck(sessionStorage.getItem('token'))
  //   setDeck(decklist)
  // }
  
  return (
    <div className="card">
      <img src={props.cardurl} alt="" />
    </div>
  )
}
export default RandomCard