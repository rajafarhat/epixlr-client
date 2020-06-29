import React, {useState} from 'react'
import ReactDOM from 'react-dom';
import {
    makeStyles
  } from '@material-ui/core';
import PayPalBtn from './paypalButton.js'
import swal from 'sweetalert';

const useStyles = makeStyles((theme) => ({
    p0: { paddingRight: 0, paddingLeft: 0 },
    mainBg: {
        paddingRight: "80px !important",
        paddingLeft: "80px !important",
        background: "linear-gradient(to bottom, #00bbd4 50%, white 50%)"
    },
    centerAlign:{
        textAlign: "center"
    },
    header: { 
        color: "white", 
        marginBottom: "50px",
        width: "100%"
    },
    headerH: {
        marginBottom: "20px"
    },
    roundedBtn: {
        fontSize: "80%",
        borderRadius: "5rem",
        letterSpacing: ".1rem",
        fontWeight: "bold",
        padding: "1rem",
        width: "50%",
        transition:"all 0.2s"
    },
    shadow: {
        "-moz-box-shadow": "0 0 60px #a2a0a0",
        "-webkit-box-shadow": "0 0 60x #a2a0a0",
        boxShadow: "0 0 60px #a2a0a0",
    },
    radioButtons: {
        fontSize: "80%",
        borderRadius: "5rem",
        letterSpacing: ".1rem",
        fontWeight: "bold",
        padding: "1rem",
        background: "white",
        transition:"all 0.2s"
    },
    radioButtonActive: {
        background: "#9b4efdad",
        color: "white"
    },
    featuresList:{
        marginLeft: 0,
        marginTop: "40px",
        marginBottom: "10px"
    },
    price: {
        fontSize: "50px",
        color: "grey",
        fontWeight: "500",
        marginBottom: "30px"
    },
    dollarSign: {
        fontSize: "25px",
        top:" -.7em",
        opacity: "0.5",
        marginLeft: "15px"
    },
    '@global': {
        'ul > li': {
          paddingBottom: '5px'
        },
    },
    hidden:{
        display:"none"
    },
    subscribedPlanText: {
        background: "#08af08",
        color: "white",
        padding: "5px",
    }
}));

function SubscriptionPackages(props) {
    const classes = useStyles();
    const [packageTenure, setPackageTenure] = useState(localStorage.getItem("subscriptionTenure") != null ? localStorage.getItem("subscriptionTenure") : "annual");
    const [paypalPlan, setPaypalPlan] = useState("")
    const [subscribedPlan, setSubscribedPlan] = useState(localStorage.getItem("subscribedPlan"))
    const prices = {
        annual: {
            solo: 108,
            pro: 600,
            enterprise: "23,988"
        },
        monthly: {
            solo: 9,
            pro: 50,
            enterprise: 1999
        }
    }

    const paypalPlanIds = {
        annual: {
            solo: "P-09T56753816101249L35CXDA",
            pro: "P-5KY65215W82254410L35CW3Q",
            enterprise: "P-24939586G3040340JL35CWTY"
        },
        monthly: {
            solo: "P-9V423387GP505152HL35CU7A",
            pro: "P-15W63439DL4816334L35CVHI",
            enterprise: "P-99R58042Y8946613YL35CVTQ"
        }
    }

    const handlePackageTenureChange = (e) => {
        const { value } = e.target
        setPackageTenure(value)
    }

    const paymentHandler = (details, data) => {
        swal.close();
        setSubscribedPlan(localStorage.getItem("subscribedPlan"))
        
        localStorage.setItem("subscriptionTenure",packageTenure)
        
        const { billingToken, facilitatorAccessToken, orderID, subscriptionID} = details
    }

    const handlePackageSelect = (e) => {
        const { value } = e.target
        var planId = packageTenure === "annual" ? paypalPlanIds.annual[value] : paypalPlanIds.monthly[value]
        localStorage.setItem("subscribedPlan",planId)
        let wrapper = document.createElement('div');
        ReactDOM.render(<PayPalBtn
            plan = {planId}
            onSuccess={paymentHandler} />, wrapper);
        let el = wrapper;

        swal({
            text: 'Select your payment method',
            content: el,
            button: {
              text: "Cancel!",
              closeModal: true,
            },
        })
    }

    return (
        <div className="row">
            <div className="col">
                <div className="kt-portlet">
                    <div className={"kt-portlet__body " + classes.mainBg}>
                    <div className={"row " + classes.centerAlign}>
                        <div className={classes.header}>
                            <h3 className={classes.headerH}>Subscribe Your Best Plan</h3>
                            

                            <div className={"btn-group btn-group-toggle "} data-toggle="buttons">
                                <label className={packageTenure === "annual" ? "btn text-uppercase active " + classes.radioButtons + " " + classes.radioButtonActive : "btn text-uppercase " + classes.radioButtons}>
                                    <input type="radio" onClick={handlePackageTenureChange} name="packageTenure" value="annual" /> Annual Plan
                                </label>
                                <label className={packageTenure === "monthly" ? "btn text-uppercase active " + classes.radioButtons + " " + classes.radioButtonActive : "btn text-uppercase " + classes.radioButtons}>
                                    <input type="radio" onClick={handlePackageTenureChange} name="packageTenure" value="monthly"  /> Monthly Plan
                                </label>
                            </div>
                        </div>
                    </div>
                    <div className={"row " + classes.centerAlign + " " + classes.shadow}>
                        <div className={"col-lg-4 " + classes.p0}>
                            <div className={"card mb-5 mb-lg-0 " + classes.centerAlign}>
                                <div className="card-body">
                                    <h3 className="card-title text-muted text-center">Solo</h3>
                                    {
                                        subscribedPlan == paypalPlanIds[packageTenure].solo ?
                                            <h5 className={classes.subscribedPlanText}>Subscribed</h5>
                                        : ""
                                    }
                                    <ul className={"fa-ul " + classes.featuresList}>
                                        <li>$2 per image</li>
                                        <li>Background removal</li>
                                        <li>Object alignment</li>
                                        <li>Cropping and resizing</li>
                                        <li>Shadow</li>
                                        <li>Basic Retouch</li>
                                        <li>Clipping path</li>
                                        <li>Free trail</li>
                                        <li>2 users</li>
                                        <li>&nbsp;</li>
                                        <li>&nbsp;</li>
                                    </ul>
                                    <h4 className={classes.price}>{packageTenure === "annual" ? prices.annual.solo : prices.monthly.solo}
                                        <sup className={classes.dollarSign}>$</sup>
                                    </h4>
                                    <button onClick={handlePackageSelect} value="solo" className={"btn btn-primary text-uppercase " + classes.roundedBtn}>Purchase</button>
                                </div>
                            </div>
                        </div>
                        <div className={"col-lg-4 " + classes.p0}>
                            <div className={"card mb-5 mb-lg-0 " + classes.centerAlign}>
                            <div className="card-body">
                                <h3 className="card-title text-muted text-center">Pro</h3>
                                {
                                    subscribedPlan == paypalPlanIds[packageTenure].pro ?
                                        <h5 className={classes.subscribedPlanText}>Subscribed</h5>
                                    : ""
                                }
                                <ul className={"fa-ul " + classes.featuresList}>
                                    <li>$1.8 per image</li>
                                    <li>Background removal</li>
                                    <li>Object alignment</li>
                                    <li>Cropping and resizing</li>
                                    <li>Reflection shadow</li>
                                    <li>Drop shadow</li>
                                    <li>Clipping path</li>
                                    <li>Basic retouch</li>
                                    <li>Extension</li>
                                    <li>Free trail</li>
                                    <li>10 users</li>
                                </ul>
                                <h4 className={classes.price}>{packageTenure === "annual" ? prices.annual.pro : prices.monthly.pro}
                                    <sup className={classes.dollarSign}>$</sup>
                                </h4>
                                <button value="pro" onClick={handlePackageSelect} className={"btn btn-primary text-uppercase " + classes.roundedBtn}>Purchase</button>
                            </div>
                            </div>
                        </div>
                        <div className={"col-lg-4 " + classes.p0}>
                            <div className={"card mb-5 mb-lg-0 " + classes.centerAlign}>
                            <div className="card-body">
                                <h3 className="card-title text-muted text-center">Enterprise</h3>
                                {
                                    subscribedPlan == paypalPlanIds[packageTenure].enterprise ?
                                        <h5 className={classes.subscribedPlanText}>Subscribed</h5>
                                    : ""
                                }
                                <ul className={"fa-ul " + classes.featuresList}>
                                    <li>$1 per image</li>
                                    <li>Pro image editing</li>
                                    <li>Clipping path</li>
                                    <li>Account manager</li>
                                    <li>Custom retouch</li>
                                    <li>24/7 Skype live support</li>
                                    <li>Extension</li>
                                    <li>Instruction tools</li>
                                    <li>Unlimited users</li>
                                    <li>&nbsp;</li>
                                    <li>&nbsp;</li>
                                </ul>
                                <h4 className={classes.price}>{packageTenure === "annual" ? prices.annual.enterprise : prices.monthly.enterprise}
                                    <sup className={classes.dollarSign}>$</sup>
                                </h4>
                                <button value='enterprise' onClick={handlePackageSelect} className={"btn btn-primary text-uppercase " + classes.roundedBtn}>Purchase</button>
                            </div>
                            </div>
                        </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SubscriptionPackages