import logo from './logo.svg';
import './App.css';
import React,{Component,} from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import ReactPaginate from "react-paginate";
import { Button, Card, CardBody, CardHeader, Col, Form,FormGroup, Input,InputGroup, InputGroupAddon, InputGroupText, Row, Table, Label } from 'reactstrap';
import { render } from '@testing-library/react';


class App extends Component{
  constructor(props){
    
    super(props);
    this.state = {
      id:this.id,
      name:this.name,
      status:this.status,
      species:this.species,
      type:this.type,
      gender:this.gender,
      users: [],
      offset:0,
      perPage:5,
      currentPage:0,
      tableData:[],
      filterData:[],
      sendCharacter:[],
      email:this.email,
    }
    this.handlePageClick = this.handlePageClick.bind(this);
  }

  handlePageClick = (e) => {
    const selectedPage = e.selected;
    const offset = selectedPage * this.state.perPage;

    this.setState({
        currentPage: selectedPage,
        offset: offset
    }, () => {
        this.loadMoreData()
    });
  };

  loadMoreData() {
		const data = this.state.filterData;
		
		const slice = data.slice(this.state.offset, this.state.offset + this.state.perPage)
		this.setState({
			pageCount: Math.ceil(data.length / this.state.perPage),
			tableData:slice,
		})
	}

  onChange=async e=>{
  await this.setState({
        [e.target.name]: e.target.value
    });
    console.log(e.target.value);
    this.filtrarElements();
  }

  filtrarElements=()=>{
    var search=this.state.users.filter(item=>{
      if(
        (typeof this.state.name === 'undefined' || this.state.name.trim() == '' || item.name.toLowerCase().includes(this.state.name))
        && (typeof this.state.status === 'undefined' || this.state.status.trim() == '' || item.status.toLowerCase().includes(this.state.status.toLowerCase()))
        && (typeof this.state.specie === 'undefined' || this.state.specie.trim() == '' || item.species.toLowerCase().includes(this.state.specie))
        && (typeof this.state.type === 'undefined' || this.state.type.trim() == '' || item.type.toLowerCase().includes(this.state.type))
        && (typeof this.state.gender === 'undefined' || this.state.gender.trim() == '' || item.gender.toLowerCase().includes(this.state.gender.toLowerCase()))
      ){
        return item;
      }
    });
    console.log(this.state.status);
    var slice = search.slice(this.state.offset,this.state.offset + this.state.perPage)
    this.setState({pageCount:Math.ceil(search.length / this.state.perPage),
      tableData: slice,
      filterData:search});
  }

  recivePersonaje=(data)=>{
    var checkbox = document.getElementById(data.id).checked;
    const arr = this.state.sendCharacter;
    if(checkbox){
      const arr2 = arr.unshift(data);
      console.log(arr);
    }else{
      this.removeItemFromArr( arr, data );
      console.log(arr);
    }
    
  }

  removeItemFromArr ( arr, item ) {
    var i = arr.indexOf( item );
    arr.splice( i, 1 );
  }

  enviarPersonaje(){
      const json = this.state.sendCharacter;
      json.map((data, i)=>{
      console.log('Se envia:'+data.name)
      axios.post('http://dinossolutions.com/api/api2.php',{
        EMAIL:this.state.email,
        CHARACTER:data.name,
        SPECIE:data.species,
        STATUS:data.status,
        ORIGIN:data.origin.name,
        LOCATION:data.location.name,
        TYPE:data.type,
        GENDER:data.gender,
        IMG:data.image,
      }).then(response=>{
        console.log(response);
        this.componentDidMount()
      }).catch(error=>{
       alert("Error 456"+error)
      })
      });
 }

  async componentDidMount(){
    await axios.get('https://rickandmortyapi.com/api/character/').then(response=>{
      var dat = response.data.results;
      var slice = dat.slice(this.state.offset,this.state.offset + this.state.perPage)
      this.setState({
        pageCount:Math.ceil(dat.length / this.state.perPage),
        users:response.data.results,
        tableData:slice,
        filterData:dat
      });
      console.log(this.state.sendCharacter.length);
    }).catch(error=>{
      alert(error);
    });
  }

  render(){
    
      return(
        <div className="animated fadeIn">
          <div>
            <Form action="" method="post" size="sm">
               <FormGroup size ="sm">
                  <InputGroup>
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>Name</InputGroupText>
                    </InputGroupAddon>
                    <Input   value={this.state.name} onChange={this.onChange.bind(this)} type="text" id="name" name="name" autoComplete="name"/>
                    <InputGroupAddon addonType="append">
                      <InputGroupText><i className="fa fa-user"></i></InputGroupText>
                    </InputGroupAddon>
                  </InputGroup>
                </FormGroup>
                <FormGroup size ="sm">
                  <InputGroup>
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>Status</InputGroupText>
                    </InputGroupAddon>
                    <Input   value={this.state.status} onChange={this.onChange.bind(this)} type="select" id="status" name="status" autoComplete="status">
                       <option></option>
                       <option value="Alive">Alive</option>
                       <option value="Dead">Dead</option>
                       <option value="unknown">unknown</option>
                    </Input>
                    <InputGroupAddon addonType="append">
                      <InputGroupText><i className="fa fa-user"></i></InputGroupText>
                    </InputGroupAddon>
                  </InputGroup>
                </FormGroup>
                <FormGroup size ="sm">
                  <InputGroup>
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>Specie</InputGroupText>
                    </InputGroupAddon>
                    <Input   value={this.state.specie} onChange={this.onChange.bind(this)} type="text" id="specie" name="specie" autoComplete="name"/>
                    <InputGroupAddon addonType="append">
                      <InputGroupText><i className="fa fa-user"></i></InputGroupText>
                    </InputGroupAddon>
                  </InputGroup>
                </FormGroup>
                <FormGroup size ="sm">
                  <InputGroup>
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>Type</InputGroupText>
                    </InputGroupAddon>
                    <Input   value={this.state.type} onChange={this.onChange.bind(this)} type="text" id="type" name="type" autoComplete="name"/>
                    <InputGroupAddon addonType="append">
                      <InputGroupText><i className="fa fa-user"></i></InputGroupText>
                    </InputGroupAddon>
                  </InputGroup>
                </FormGroup>
                <FormGroup size ="sm">
                  <InputGroup>
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>Gender</InputGroupText>
                    </InputGroupAddon>
                    <Input   value={this.state.gender} onChange={this.onChange.bind(this)} type="select" id="gender" name="gender" autoComplete="status">
                       <option></option>
                       <option>Female</option>
                       <option>Male</option>
                       <option>Genderless</option>
                       <option>unknown</option>
                    </Input>
                    <InputGroupAddon addonType="append">
                      <InputGroupText><i className="fa fa-user"></i></InputGroupText>
                    </InputGroupAddon>
                  </InputGroup>
                </FormGroup>
            </Form>
          </div>
          <Row>
            <Col xs="12" lg="14">
              <Card>
                <CardHeader>
                <h2><i className="fa fa-align-justify">Personajes</i></h2> 
                </CardHeader>
                <CardBody>
                  <Table striped bordered hover pageSize="5" size="sm">
                    <thead>
                      <tr>
                        <th>Name</th>
                        <th>Status</th>
                        <th>Specie</th>
                        <th>Origin</th>
                        <th>Location</th>
                        <th>Type</th>
                        <th>Gender</th>
                        <th>Image</th>
                        <th>Seleccionar</th>
                      </tr>
                    </thead>
                    <tbody>
                      {
                        this.renderList()
                      }
                    </tbody>
                  </Table>
                  <ReactPaginate className="pagination"
                    previousLabel={"← Anterior"}
                    nextLabel={"Siguiente →"}
                    breakLabel={<span className="gap">...</span>}
                    pageCount={this.state.pageCount}
                    onPageChange={this.handlePageClick}
                    forcePage={this.state.currentPage}
                    containerClassName={"pagination justify-content-center"}
                    pageClassName={"page-link"}
                    previousClassName={"page-link"}
                    previousLinkClassName={"page-item"}
                    nextClassName={"page-link"}
                    nextLinkClassName={"page-item"}
                    disabledClassName={"disabled"}
                    activeClassName={"page-item active"}
                    activeLinkClassName={"page-link"}/>
                </CardBody>
              </Card>
            </Col>
          </Row>
          <Form inline>
            <FormGroup size ="sm">
              <InputGroup>
                <InputGroupAddon addonType="prepend">
                  <InputGroupText>Email</InputGroupText>
                </InputGroupAddon>
                <Input   value={this.state.email} onChange={this.onChange.bind(this)} type="email" id="email" name="email" autoComplete="email"/>
                <Button onClick={()=>this.enviarPersonaje()} className="px-4" type="button" size="sm" color="primary">Enviar</Button>
                <InputGroupAddon addonType="append">
                  <InputGroupText><i className="fa fa-user"></i></InputGroupText>
                </InputGroupAddon>
              </InputGroup>
            </FormGroup>
          </Form>
        </div>
      );

  }

  renderList(){
    return this.state.tableData.map((data, i)=>{
      return(
        
        <tr>
          <td>{data.name}</td>
          <td>{data.status}</td>
          <td>{data.species}</td>
          <td>{data.origin.name}</td>
          <td>{data.location.name}</td>
          <td>{data.type}</td>
          <td>{data.gender}</td>
          <td><img height='50' widht='50'src={data.image} /></td>
          <td>
            <FormGroup check>
              <Label check>
                <Input id={data.id}   type="checkbox"  value={data.id} onClick={()=>this.recivePersonaje(data)}/> 
              </Label>
            </FormGroup>
          </td>
        </tr>
      )
      
    });
  } 

}


ReactDOM.render(<App/>, document.getElementById('root'));
export default App;
