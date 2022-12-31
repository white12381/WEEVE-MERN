import React,{useState,useEffect, useContext} from "react"; 
import Descriptions from "../Components/description"; 
import OverVeiws from "../Components/overveiw";
import ItemContext from "../Context/ItemContext";
import { AddItems } from "../hooks/AddItemhook"; 


const AddItem = () => {
  const item = useContext(ItemContext);
  const ItemName = item.ItemInfo.ItemName;
  const ItemPrice = item.ItemInfo.ItemPrice
  const ProductName = item.ItemInfo.ProductName;
  const ItemMedia = item.ItemInfo.ItemMedia;
  const Shipping = item.ItemInfo.Shipping; 
  const Warranty = item.ItemInfo.Warranty;  

  const {add,submit} = AddItems();
  const SubmitItem = async (e) => {
    e.preventDefault(); 
    await add(); 
     
  }

   const uploadItem = async (e) => {
    e.preventDefault(); 
    const file =  e.target.files[0];
    if(file){ 
      for(let i = 0; i < e.target.files.length; i++){ 
      try{

        var reader = new FileReader();
        reader.readAsDataURL(e.target.files[i]);
    
        reader.onload = () => {
        item.ItemMethods.setMediaBase64(item => [...item,reader.result]);
          console.log(reader.result); //base64encoded string
        }
        reader.onerror = error => {
          console.log("Error: ", error);
        }
      }catch(err){
        console.log(err);
      }
      }
   item.ItemMethods.setItemMedia(item => [...item, ...e.target.files]); 
   
  }
   }
   
   const deleteUploadItem = (index) => {
    const temp = [...ItemMedia];
    temp.splice(index,1);
    item.ItemMethods.setItemMedia(temp);

    const tempFile = [...item.ItemInfo.MediaBase64];
    tempFile.splice(index,1);
    item.ItemMethods.setMediaBase64(tempFile);
   }


    
const HandleListDropdown = (e) => {
  if(e.target.value === "Open this select menu"){
    item.ItemMethods.setListCategory(undefined);    
  }
  else { item.ItemMethods.setListCategory(e.target.value)}
}

    return  <div className="mt-5 container text-center">
<h1>Add Item</h1>
<form className="row justify-content-center fw-bolder"  onSubmit={SubmitItem}  encType="multipart/form-data">
            <div className="col-md-6 mt-md-3">
              <label htmlFor="ItemName" className="form-label fw-bolder">Item name</label>
              <input type="text" className="d-inline form-control" value={ItemName}  size="30" id="ItemName" onChange={ (e) =>  item.ItemMethods.setItemName(e.target.value)} placeholder="Enter Item Name" required/>
              <div className="invalid-feedback">
                Valid: Item name is required.
              </div>
            </div>
            <div className="col-md-6 mt-md-3">
              <label htmlFor="ItemPrice" className="form-label fw-bolder">Item Price</label>
              <input type="number" className="d-inline form-control" value={ItemPrice} min={0} size="30" id="ItemPrice" onChange={ (e) =>  item.ItemMethods.setItemPrice(parseFloat(e.target.value))} placeholder="Enter Item Price" required/>
              <div className="invalid-feedback">
                Valid: Item Price is required.
              </div>
            </div>
            
            <div className="col-md-6 mt-md-3">
              <label htmlFor="ProductName" className="form-label fw-bolder">Product name</label>
              <input type="text" className="d-inline form-control" value={ProductName} size="30" onChange={ (e) =>  item.ItemMethods.setProductName(e.target.value)} id="ProductName" placeholder="Enter Product Name" required/>
              <div className="invalid-feedback">
                InValid: Product name is required.
              </div>
            </div>

            
            <div className="col-md-6 mt-md-3">
            <label htmlFor="State" className="form-label fw-bolder d-block">Category</label>
            <select  id="State" className="form-select form-select-lg mb-3" aria-label=".form-select-lg example" onChange={HandleListDropdown}>
              <option >Open this select menu</option>
              <option value="Appliances and White Goods">Appliances and White Goods</option>
              <option value="Cameras">Cameras</option>
              <option value="Complete Solar System">Complete Solar System</option>
              <option value="Electronic Components">Electronic Components</option>
              <option value="Electrical Instruments">Electrical Instruments</option>
              <option value="Electrical Materials">Electrical Materials</option>
              <option value="Gaming Consoles">Gaming Consoles</option>
              <option value="Home Theatres">Home Theatres</option>
              <option value="Laptops, Tablets and Computers">Laptops, Tablets and Computers</option>
              <option value="Mobile Devices">Moblile Devices</option>
              <option value="Phone Accessories">Phone Accessories</option>
              <option value="Rechargeables">Rechargeables</option>
              <option value="Solar Portable Rechargeables">Solar Portable Rechargeables</option>
              <option value="Wearables">Wearables</option>
           </select>

              </div>


            


            <div className="col-md-6 mt-3">
            <label htmlFor="Descriptions" className="form-label fw-bolder d-block">Description</label>
              <Descriptions/>
              </div>

              <div className="col-md-6 mt-3">
                <label htmlFor="OverVeiw" className="form-label fw-bolder d-block">OverVeiw: </label>
                <OverVeiws />
                            </div>

              
              <div className="col-md-6 mt-md-3">
              <label htmlFor="WarrantyYears" className="form-label fw-bolder">Warranty Years</label>
              <input type="number" min={0} step={1} className="d-inline form-control" value={Warranty} size="30" id="WarrantyYears" onChange={(e) => item.ItemMethods.setWarranty(parseFloat(e.target.value))} placeholder="Optional"/>
              <div className="invalid-feedback">
                InValid:Warranty years should be in number.
              </div>
            </div>

                
            <div className="col-md-6 mt-md-3">
              <label htmlFor="shipping" className="form-label fw-bolder">Shipping Days</label>
              <input type="number" step={1} min={0} className="d-inline form-control" value={Shipping} onChange={ (e) =>  item.ItemMethods.setShipping( parseFloat(e.target.value))} size="30" id="shipping" placeholder="Optional"/>
              <div className="invalid-feedback">
                InValid:Shipping days should be in number.
              </div>
            </div>

            <div className="col-md-6 mt-md-5">
            <label htmlFor="image" className="form-label fw-bolder">Image/Video</label>
              <input type='file' name="productimage" multiple  id="image" accept="image/*, video/*" onChange={uploadItem} />
            </div>

            <div className="col-md-6 mt-md-5">
              {
                ItemMedia.map( (item,i) => (
                  <div className="row mt-3" key={i}>
                   <div className="col-5 me-3">
                    {item.name}
                    </div>   
                    <div className="col-3 ms-2">
                   {parseFloat(item.size * 0.001).toFixed(2)}kb
                    </div>

                    <div className="col-3">
                      <a className="btn btn-outline-danger" onClick={() => deleteUploadItem(i)} >Delete</a>
                      </div>    
                  </div>
                ))
              }
            </div>

            <button className="col-1 mt-3 btn btn-dark" disabled={submit} >Upload</button>
            
           
            </form>
            
</div>

    
}

export default AddItem;