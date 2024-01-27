import Robot from '../../Picture/robot.gif'

function Welcome(){
    return(
        <div style={{backgroundColor:'rgb(246, 246, 246)'}}>
            <img src={Robot} style={{marginTop:'69px'}} alt=''/>
            <h4>Welcome To Chatting World!</h4>
            <p>Let's Chat with each other</p>
        </div>
    );
}

export default Welcome
