const ip = 'http://localhost:45825'
// const ip = 'http://10.138.96.24:8088'
const config = {

    // serverimagepath:'http://10.138.96.24:8088//resources/images/',
    //serverimagepath:'http://10.138.94.244:8088/resources/images/',

    ip:ip,
    baseURL:ip+'/Handler',
    serverimagepath:ip+'/resources/images/',

    productstatus:[{code:'0', status:'下架'},{code:'1', status:'上架'}],
    orderstatus:[{code:'00',status:'用户删除'},
        {code:'10',status:'交易取消'},
        {code:'11',status:'未支付'},
        {code:'12',status:'已支付'},
        {code:'13',status:'已发货'},
        {code:'14',status:'交易成功'},]
}

export default config