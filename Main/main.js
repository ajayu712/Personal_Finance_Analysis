// Item Controller
const itemCtrl =(function(){
    //itme controller
    const Item = function(id,description,amount){
        this.id = id;
        this.description = description;
        this.amount = amount;
    }
    // data structure
    const data ={
        items:[]
    }
    //public method
    return{
        logData:function(){
            return data;
        },
        addMoney:function(description,amount){
            // create random id
            let ID = itemCtrl.createID();
            //create new items
            newMoney = new Item(ID, description, amount);
            console.log(newMoney)
            //push it into the array
            data.items.push(newMoney)
            console.log(data)
            return newMoney
        },
        createID: function(){
            //create random id number between 0 and 10000
            const idNum = Math.floor(Math.random()*10000);
            return idNum;
        }
    }
})();

// UI Controller
const UICtrl = (function(){
    // ui selectors
    const UISelectors = {
        incomeBtn: '#add_income',
        expenseBtn: '#add_expense',
        description: '#description',
        amount: '#amount',
        moneyEarned: '#amount_earned',
        moneyAvailable:'#amount_available',
        moneySpent:'#amount_spend',
        incomeList:'#income_container',
        expenseList:'#expense_container',
        incomeItem:'.income_amount',
        expenseItem:'.expense_amount',
        itemsContainer: '.items_container'
    }
    //public methods
    return{
        // return ui selectors
        getSelectors:function(){
            return UISelectors
        },
        getDescriptionInput:function(){
            return{
                descriptionInput:document.querySelector(UISelectors.description).value
            }
        },
        getValueInput:function(){
            return{
                amountInput:document.querySelector(UISelectors.amount).value
            }
        },
        addIncomeItem: function(item){
            //create new div
            const div = document.createElement('div')
            // add class to the div
            div.classList ='item income'
            //add id to the div
            div.id = 'item-${item.id}'
            //add html
            div.innerHTML =`
                <h4>${item.description}</h4>
                <div class="item_income">
                    <p class="symbol">₹</p>
                    <span class="income_amount">${item.amount}</span>
                </div>
                <i class="fa fa-trash-alt"></i>
            `;
            //insert income into the list
            document.querySelector(UISelectors.incomeList).insertAdjacentElement('beforeend',div)
        }
    }
})();

//App Controller
const App = (function(){
    //event listeners
    const loadEventListeners = function(){
        //get ui selector
        const UISelectors = UICtrl.getSelectors();
        // add new income
        document.querySelector(UISelectors.incomeBtn).addEventListener('click',addIncome);
    }

    //add new income
    const addIncome = function(){
        // get description and amount values
        const description = UICtrl.getDescriptionInput();
        const amount = UICtrl.getValueInput();
        // if inputs are not empty
        if(description.descriptionInput !=='' && amount.amountInput !==''){
            //add new item
            const newMoney = itemCtrl.addMoney(description.descriptionInput,amount.amountInput);
            console.log(newMoney)
            //add item to the list
            UICtrl.addIncomeItem(newMoney)

            //check data
            // const checkData = itemCtrl.logData();
            // console.log(checkData)
        }
    }

    //init function
    return{
        init:function(){
            loadEventListeners();
        }
    }
})(itemCtrl,UICtrl)

App.init();