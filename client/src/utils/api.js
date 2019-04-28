import axios from "axios";

export default {

  // Deletes the Work order with the given id
  deleteWorkOrder: function (id) {
    return axios.delete("/DeleteWorkOrder/" + id);
  },

  // Saves a work order ticket by User id
  // saveWorkOrder: function (id) {
  //   console.log('Function works: this.props.id:' + id)
  //   return axios.post("/CreateWorkOrder/" + id);
  // },
  //Finds all open work orders for all Users
  getAllOpenOrders: function (id) {
    return axios.get("/AllOpenWorkOrders/" + id)
  },
  // Finds all open work orders by User id
  getOpenOrders: function (id) {
    // console.log('Function works: this.props.id:' + id)
    return axios.get("/OpenWorkOrder/" + id) 
  },

  //Finds all closed work orders by User id
  getClosedOrders: function (id) {
    return axios.get("/ClosedWorkOrder/" + id)
  },

};