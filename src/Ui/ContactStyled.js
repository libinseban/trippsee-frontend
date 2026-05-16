import styled from 'styled-components';

// export const FirstBox=styled.div`
    
// `

export const FirstDiv=styled.div`
    display: flex;
    align-items: center;
    margin-top: 35px;
   position: absolute;
    &:hover {
    cursor: pointer;
  }
 @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
  }
`
export const FillOut = styled.p`
margin-top:15px`
export const Contact =styled.p`
       margin: 10px;
      &:hover {
  font-weight: 600;}
`
export const HomeStyle=styled.p`
margin: 10px;
    margin-left: 45px;
      &:hover {
  font-weight: 600;
  }
`
export const CallUs=styled.p`
 margin-left:10px;

    font-weight: 600;
`

export const SecondDiv = styled.p`
position: absolute;
margin-left:85PX;
margin-bottom: 50px;



display: flex;
`
export const CallIcon=styled.div`
    display:flex;
align-items: center;
margin-top: 90px;

`
export const MyEmail = styled.p`
padding-top:10px`
export const NewSpan = styled.span`
margin-top:40px;
margin-left: 85px;


position: absolute;
`
export const ContactMainDiv = styled.div`

  border: 0px 0px 0px 0px  solid #ffffff;
 box-shadow: 10p 14px 8px rgba(243, 243, 243, 0.25), 0 10px 10px rgba(0, 234, 255, 0.22);

  max-width: 100%;
  max-height: 600px;
      display: flex;
      align-items: center;
    
      height: 100vh;
background: linear-gradient(to right, #ffffff, #ffffff,#7bfffd,#ffffff);
 @media (max-width: 768px) {
    flex-direction: column;
  }
`

export const HorizontalLine = styled.span`
  height: 1px;
width: 300px;
  background-color: #000; 
margin-left: 80px;
margin-bottom: 140px;
position: absolute;

`;
export const Available=styled.p`
    margin-top: 15px;

`

export const MobileContact = styled.p`
margin-top:10px`
export const AddressDetails=styled.div`

  min-width: 400px;
  min-height: 600px;
  margin-left: 12vh;
  margin-top: 5vh;
`
export const FormContainer = styled.form`
min-height: 600px;
min-width: 550px;
margin-left: 150px;

background: linear-gradient(to right, #000000, #991616, );
  padding: 50px;
  
  box-shadow: 0 0px 4px rgba(249, 251, 255, 0.1);
`;

export const Label = styled.label`
  display: block;
  margin-bottom: 8px;
  color: #333;
`;

export const Input = styled.input`
  width: 100%;
  padding: 10px;
  margin-bottom: 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

export const TextArea = styled.textarea`
height:150px;
  width: 100%;
  padding: 10px;
  margin-bottom: 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

export const SubmitButton = styled.button`
margin-left: 160px;
font-weight: 600;
  background-color: #e1f7f4;
  color: #000000;
  padding: 12px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #9ffafa;
  }

  &:disabled {
    background-color: #b3b3b3;
    cursor: not-allowed;
  }
`;

export const SuccessMessage = styled.p`
  color: #4cafa5;
  font-weight: bold;
`;

export const ErrorMessage = styled.p`
  color: #ff5733;
  font-weight: bold;
`;