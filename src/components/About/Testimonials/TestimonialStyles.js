import styled from 'styled-components';
import devices from "../../../utils/devices"

export default styled.div`
.CardsContainer{
    display:flex;
    flex-direction:column;
    align-items:center;
    height:1200px;
    justify-content: space-evenly;
}
.Card{
    display:flex;
    flex-direction:column;
    border-radius:1rem;
    width:300px
    padding:20px;
    height:275px
    margin-bottom:2rem
    box-shadow:0px 4px 7px rgba(0,0,0,0.2)
}
.User{
    display:flex;
    justify-content:space-around;
    align-items:center;
}
.circle{
    background:#4FAD65;
    border-radius:50%;
    width:100px;
    height:100px;
}

@media${devices.large}{
    .CardsContainer{
        flex-direction:row;
        height:auto;
        justify-content: space-between;
    }
    .Card{
        margin: 3rem 1rem;
        height: 246px;
    }
}

`;