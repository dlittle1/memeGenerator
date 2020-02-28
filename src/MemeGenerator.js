import React from 'react'

class MemeGenerator extends React.Component {
   constructor(){
      super()
      this.state = {
         topText: "",
         bottomText: "",
         randomImg: "http://i.imgflip.com/1bij.jpg",
         allMemeImgs: []
      }

      this.handleChange = this.handleChange.bind(this)
      this.handleClick = this.handleClick.bind(this)
   }

   componentDidMount(){
      fetch('https://api.imgflip.com/get_memes')
         .then(response => response.json())
         .then(response => this.setState({allMemeImgs: response.data.memes}))
   }

   handleClick(event){
      event.preventDefault()
      let newImg = this.state.allMemeImgs[Math.floor(Math.random() * this.state.allMemeImgs.length)].url

      this.setState({randomImg: newImg})
   }
   handleChange(event){
      const {name, value} = event.target

      this.setState({
         [name]: value
      })
   }

   render() {
      return (
         <div>
            <form>
               <input
                  placeholder="Top Text"
                  name="topText"
                  type="text"
                  value={this.state.topText}
                  onChange={this.handleChange}
               />
               <input
                  placeholder="Bottom Text"
                  name="bottomText"
                  type="text"
                  value={this.state.bottomText}
                  onChange={this.handleChange}
               />
               <button onClick={this.handleClick}>Submit</button>
            </form>
            <div className="meme">
               <h1 className="top">{this.state.topText}</h1>
               <img src={this.state.randomImg} />
               <h1 className="bottom">{this.state.bottomText}</h1>
            </div>
         </div>
      )
   }
}

export default MemeGenerator
