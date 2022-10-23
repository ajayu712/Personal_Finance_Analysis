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
            //console.log(newMoney)
            //push it into the array
            data.items.push(newMoney)
            //console.log(data)
            return newMoney
        },
        createID: function(){
            //create random id number between 0 and 10000
            const idNum = Math.floor(Math.random()*10000);
            return idNum;
        },
        getIdNumber: function(item){
            const amountId = (item.parentElement.id);
            //console.log(amountId)
            const itemArr = amountId.split('-');
            const id = parseInt(itemArr[1])
            return id
        },
        deleteAmountArr:function(id){
            const ids = data.items.map(function(item){
                return item.id
            });
            const index = ids.indexOf(id)
            data.items.splice(index,1)
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
        moneySpent:'#amount_spent',
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
            const div = document.createElement('div');
            // add class to the div
            div.classList ='item income'
            //add id to the div
            div.id = `item-${item.id}`
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
        },
        clearInputs:function(){
            document.querySelector(UISelectors.description).value=''
            document.querySelector(UISelectors.amount).value=''
        },
        updateEarned:function(){
            //all income elements
            const allIncome = document.querySelectorAll(UISelectors.incomeItem)
            //console.log(allIncome)
            //array with all income
            const incomeCount = [...allIncome].map(item => +item.innerHTML);
            //Calculate Total Earned
            const incomeSum = incomeCount.reduce(function(a,b){
                return a+b
            },0);
            // console.log(incomeSum)
            const earnedTotal = document.querySelector(UISelectors.moneyEarned).innerHTML = incomeSum.toFixed(2);
        },
        addExpenseItem:function(item){
            //create new div
            const div = document.createElement('div');
            // add class to the div
            div.classList ='item expense'
            //add id to the div
            div.id = `item-${item.id}`
            //add html
            div.innerHTML =`
                <h4>${item.description}</h4>
                <div class="item_expense">
                    <p class="symbol">₹</p>
                    <span class="expense_amount">${item.amount}</span>
                </div>
                <i class="fa fa-trash-alt"></i>
            `;
            //insert income into the list
            document.querySelector(UISelectors.expenseList).insertAdjacentElement('beforeend',div)
        },
        updateSpent:function(){
            //all expenses elements
            const allExpenses = document.querySelectorAll(UISelectors.expenseItem)
            //Array with all expenses
            const expenseCount = [...allExpenses].map(item => +item.innerHTML);
            //Calculate Total Spent
            const expenseSum = expenseCount.reduce(function(a,b){
                return a+b
            },0)
            const expensesTotal = document.querySelector(UISelectors.moneySpent).innerHTML = expenseSum.toFixed(2);
        },
        updateAvailable:function(){
            const earned = document.querySelector(UISelectors.moneyEarned);
            const spent = document.querySelector(UISelectors.moneySpent);
            const available = document.querySelector(UISelectors.moneyAvailable);
            available.innerHTML = ((+earned.innerHTML)-(+spent.innerHTML)).toFixed(2)
        },
        deleteAmount: function(id){
            const amountId = `#item-${id}`;
            const amountDelete = document.querySelector(amountId)
            amountDelete.remove()
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
        // add new expense
        document.querySelector(UISelectors.expenseBtn).addEventListener('click',addExpense);
        // Delete Item
        document.querySelector(UISelectors.itemsContainer).addEventListener('click',deleteItem);
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
            //add item to the list
            UICtrl.addIncomeItem(newMoney);
            //Clear Inputs
            UICtrl.clearInputs();
            //Update Earned
            UICtrl.updateEarned();
            //Calculate Money Available
            UICtrl.updateAvailable();
        }
    }
    //Add new Expense
    const addExpense =function(){
        // get description and amount values
        const description = UICtrl.getDescriptionInput();
        const amount = UICtrl.getValueInput();
        // if inputs are not empty
        if(description.descriptionInput !=='' && amount.amountInput !==''){
            //add new item
            const newMoney = itemCtrl.addMoney(description.descriptionInput,amount.amountInput);
            //add Item to List
            UICtrl.addExpenseItem(newMoney);
            //Clear Inputs
            UICtrl.clearInputs();
            //Update Spent
            UICtrl.updateSpent();
            //Calculate Money Available
            UICtrl.updateAvailable();
        }
    }
    //Delete Item
    const deleteItem = function(e){
        if(e.target.classList.contains('fa')){
            const id = itemCtrl.getIdNumber(e.target)
            UICtrl.deleteAmount(id)
            itemCtrl.deleteAmountArr(id)
            //Update Earned
            UICtrl.updateEarned();
            //Update Spent
            UICtrl.updateSpent();
            //Calculate Money Available
            UICtrl.updateAvailable();
        }
        e.preventDefault()
    }
    //init function
    return{
        init:function(){
            loadEventListeners();
        }
    }
})(itemCtrl,UICtrl)

App.init();