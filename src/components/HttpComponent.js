import React, { Component } from 'react';
import { Button, Card, CardBody, CardTitle,CardText,Container,Row,Col,ButtonToolbar, CardFooter} from 'reactstrap';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck , faClock,faArrowLeft,faChevronRight,faUserCircle} from "@fortawesome/free-solid-svg-icons";
class Http extends Component{

    constructor(props){
        super(props);
        this.state={
            transactionHistory:[],
            isLoaded:false
        };
    }
    componentDidMount() {
        const userId=1;
        const recipientId=2;
        const url='https://dev.onebanc.ai/assignment.asmx/GetTransactionHistory?userId='+userId+'&recipientId='+recipientId;
        axios.get(url).then(response => this.setState({ transactionHistory: response.data.transactions, isLoaded:true }));
    }


    render(){
        if(this.state.isLoaded){
            let allTransactions=this.state.transactionHistory;
            console.log(allTransactions);
            let customer;
            let dateArray=[];
            let count=0;
            return(
                <Container className="mt-5 shadow-lg rounded-3">
                    <Row className="p-3 border border-dark">
                    {allTransactions.map((transaction) => {
                        
                        if(transaction.id){
                            
                            dateArray[count]=transaction.startDate.split('T')[0];
                            count++;
                        }
                        if(count==allTransactions.length){
                            dateArray = [...new Set(dateArray)];
                            customer=transaction.partner.vPay.split('@');
                            customer=customer[0].replace(/([a-z])([A-Z])/g, '$1 $2');
                        }
                    })}
                    <h5 className="text-capitalize"><FontAwesomeIcon icon={faArrowLeft} />&nbsp;&nbsp;<FontAwesomeIcon size = '2x' className="align-middle text-success" icon={faUserCircle} />&nbsp;&nbsp;{customer}</h5>
                    </Row>
                    <Row className="p-3 border border-dark mb-5">
                        <Col>
                            {dateArray.map(date => {
                                let dateNew= new Date(date);
                                dateNew = dateNew.toString();
                                dateNew = dateNew.split(" ");
                                return(<>
                                <Row className="w-100 text-center mb-3">
                                    <h6 className='group-date'> {dateNew[2]+' '+dateNew[1]+' '+dateNew[3]} </h6>
                                </Row>
                                {allTransactions.map(transaction => {
                                if(date==transaction.startDate.split('T')[0]){
                                    let dateNew1= new Date(transaction.startDate);
                                    var hours = dateNew1.getHours() ;
                                    var AmOrPm = hours >= 12 ? 'PM' : 'AM';
                                    hours = (hours % 12) || 12;
                                    var minutes = dateNew1.getMinutes() ;
                                    var finalTime = hours + ":" + minutes + " " + AmOrPm; 
                                    // console.log(finalTime);
                                    if(transaction.direction==2){
                                    return(
                                    <>
                                    <Card className="mb-4 width alignleft" key={transaction.id}>
                                        <CardBody>
                                            {
                                            (() => {
                                                    if (transaction.direction===1 && transaction.type===1 && transaction.status===2)
                                                        return  <>
                                                                <div>
                                                                    <h4 className="d-inline-block">{transaction.amount} </h4>
                                                                    <p className="d-inline-block alignright"><FontAwesomeIcon className="text-success" icon={faCheck}/>&nbsp;You Paid</p>
                                                                </div>
                                                                <>
                                                                <CardText>TransactionID</CardText>
                                                                <CardText className="w-100">{transaction.id} </CardText>
                                                                </>
                                                                </>
                                                    else if (transaction.direction===2 && transaction.type===1 && transaction.status===2)
                                                        return  <>
                                                                <div>
                                                                    <h4 className="d-inline-block">{transaction.amount} </h4>
                                                                    <p className="d-inline-block alignright"><FontAwesomeIcon className="text-success" icon={faCheck}/>&nbsp;You Received</p>
                                                                </div>
                                                                <>
                                                                <CardText>TransactionID</CardText>
                                                                <CardText>{transaction.id} </CardText>
                                                                </>
                                                                </>
                                                    else if (transaction.direction===1 && transaction.type===2)
                                                        return  <>
                                                                <div>
                                                                    <h4 className="d-inline-block">{transaction.amount} </h4>
                                                                    <p className="d-inline-block alignright"><FontAwesomeIcon icon={faClock}/>&nbsp;You Requested</p>
                                                                </div>
                                                                <>
                                                                <Button variant="outline-dark">Cancel</Button>
                                                                
                                                                </>
                                                                </>
                                                    else return <>
                                                                <div>
                                                                    <h4 className="d-inline-block">{transaction.amount} </h4>
                                                                    <p className="d-inline-block alignright"><FontAwesomeIcon icon={faClock}/>&nbsp;Request Received</p>
                                                                </div>
                                                                <>
                                                                <ButtonToolbar>
                                                                    <Button className="d-inline-block" variant="outline-dark">Pay</Button>
                                                                    &nbsp;&nbsp;
                                                                    <Button className="d-inline-block" variant="outline-dark">Decline</Button>
                                                                </ButtonToolbar>
                            
                                                                </>
                                                                </>
                                                })()
                                            }
                                        </CardBody>
                                        <CardFooter className="text-right">
                                            {dateNew[2]+' '+dateNew[1]+' '+dateNew[3]+', '+finalTime}
                                        </CardFooter>
                                    </Card>
                                    </>
                                )
                        }
                        else{
                            return(
                                <>
                                <Card className="mb-4 width alignright" key={transaction.id}>
                                    <CardBody>
                                        {
                                        (() => {
                                                if (transaction.direction===1 && transaction.type===1 && transaction.status===2)
                                                    return  <>
                                                            <div>
                                                                <h4 className="d-inline-block">{transaction.amount} </h4>
                                                                <p className="d-inline-block alignright"><FontAwesomeIcon className="text-success" icon={faCheck}/>&nbsp;You Paid</p>
                                                            </div>
                                                            <CardText>TransactionID</CardText>
                                                            <CardText>{transaction.id}</CardText>
                                                            </>
                                                else if (transaction.direction===2 && transaction.type===1 && transaction.status===2)
                                                    return  <>
                                                            <div>
                                                                <h4 className="d-inline-block">{transaction.amount} </h4>
                                                                <p className="d-inline-block alignright"><FontAwesomeIcon className="text-success" icon={faCheck}/>&nbsp;You Received</p>
                                                            </div>
                                                            <CardText>TransactionID</CardText>
                                                            <CardText>{transaction.id}</CardText>
                                                            </>
                                                else if (transaction.direction===1 && transaction.type===2)
                                                    return  <>
                                                            <div>
                                                                <h4 className="d-inline-block">{transaction.amount} </h4>
                                                                <p className="d-inline-block alignright"><FontAwesomeIcon icon={faClock}/>&nbsp;You Requested</p>
                                                            </div>
                                                            <>
                                                            <Button variant="outline-dark">Cancel</Button>
                                                            <FontAwesomeIcon className="alignright ml-auto" icon={faChevronRight}/>
                                                            </>
                                                            </>
                                                else return <>
                                                            <div>
                                                                <h4 className="d-inline-block">{transaction.amount} </h4>
                                                                <p className="d-inline-block alignright"><FontAwesomeIcon icon={faClock}/>&nbsp;Request Received</p>
                                                            </div>
                                                            <ButtonToolbar>
                                                                <Button className="d-inline-block" variant="outline-dark">Pay</Button>
                                                                &nbsp;&nbsp;
                                                                <Button className="d-inline-block" variant="outline-dark">Decline</Button>
                                                            </ButtonToolbar>
                                                            </>
                                            })()
                                        }
                                    </CardBody>
                                    <CardFooter className="text-right">
                                        {dateNew[2]+' '+dateNew[1]+' '+dateNew[3]+', '+finalTime}
                                    </CardFooter>
                                </Card>
                                </>
                            )
                        }
                    }    
                    })}
                                </>)})}
                                    
                        </Col>
                    </Row>
                </Container>
            )
        }
        return(
            <>
            </>
        );

    }
}

export default Http;