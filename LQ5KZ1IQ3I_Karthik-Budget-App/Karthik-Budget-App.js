let budgetAmountEle = document.getElementById("budgetAmount");

let totalExpensesAmountEle = document.getElementById("totalExpensesAmount");

let balanceAmountEle = document.getElementById("balanceAmount");

let budgetInputEle = document.getElementById("budgetInput");
let budgetInputErrMsgEle = document.getElementById("budgetInputErrMsg");

let expenseTitleInputEle = document.getElementById("expenseTitleInput");
let expenseTitleInputErrMsgEle = document.getElementById("expenseTitleInputErrMsg");

let expenseAmountInputEle = document.getElementById("expenseAmountInput");
let expenseAmountInputErrMsgEle = document.getElementById("expenseAmountInputErrMsg");

let expensesHistoryEle = document.getElementById("expensesHistory");

let setBudgetBtnEle = document.getElementById("setBudgetBtn");
let addExpenseBtnEle = document.getElementById("addExpenseBtn");

let formBudgetEle = document.getElementById("formBudget");
let expenseFormEle = document.getElementById("expenseForm");

let totalData = {
    budget: 0,
    expenses: 0,
    balance: 0,
    expenseData: []
};

function deleteExpenseItem(idExpense) {

    let deletedExpenseItem = document.getElementById(idExpense);
    expensesHistoryEle.removeChild(deletedExpenseItem);
    let delteindex = totalData["expenseData"].findIndex(function(each) {
        let eachId = "expense<expense" + each.count + ">";
        if (eachId == idExpense) {
            return true;
        } else {
            return false;
        }
    })
    let deleteexpenseItem = totalData["expenseData"];
    let deleteexpenseItemAmount = deleteexpenseItem[delteindex].expenseAmount;

    totalData["expenseData"].splice(delteindex, 1);
    totalData["expenses"] = totalData["expenses"] - deleteexpenseItemAmount;
    totalData["balance"] = totalData["balance"] + deleteexpenseItemAmount;

    totalExpensesAmountEle.textContent = totalData["expenses"];
    balanceAmountEle.textContent = totalData["budget"] - totalData["expenses"];
}

function createAList(Title, Amount) {
    let id = totalData["expenseData"].length + 1
    totalData["expenseData"].push({
        expensetitle: Title,
        expenseAmount: Amount,
        count: id
    });
    let expenseList = document.createElement("li");
    expenseList.classList.add("expense", "d-flex", "flex-column", "mt-2", "justify-content-start");
    let expenseId = "expense<expense" + id + ">"
    expenseList.id = expenseId;

    let expenseListContainer = document.createElement("div");
    expenseListContainer.classList.add("d-flex", "flex-row", "justify-content-start");
    expenseList.appendChild(expenseListContainer);
    let expenseTitle = document.createElement("h1");
    expenseTitle.classList.add("expense-title-history");
    expenseTitle.textContent = Title;
    expenseListContainer.appendChild(expenseTitle);

    let expenseSpent = document.createElement("p");
    expenseSpent.classList.add("expense-spent");
    expenseSpent.textContent = Amount;
    expenseListContainer.appendChild(expenseSpent);

    let deleteExpense = document.createElement("i");
    deleteExpense.classList.add("delete-icon", "fas", "fa-trash-alt");
    expenseListContainer.appendChild(deleteExpense);
    deleteExpense.onclick = function() {
        deleteExpenseItem(expenseId);
    }
    expensesHistoryEle.appendChild(expenseList);
}

setBudgetBtnEle.addEventListener("click", function(event) {
    if (budgetInputEle.value === "") {
        budgetInputErrMsgEle.textContent = "*Required";
    } else {
        budgetInputErrMsgEle.textContent = "";
        totalData["budget"] = budgetInputEle.value;
        budgetAmountEle.textContent = totalData["budget"];
        totalExpensesAmountEle.textContent = totalData["expenses"];
        balanceAmountEle.textContent = totalData["budget"] - totalData["expenses"];
        budgetInputEle.value = "";

    }
})

addExpenseBtnEle.addEventListener("click", function(event) {
    let expenseTitleValue = expenseTitleInputEle.value;
    let expenseAmountValue = expenseAmountInputEle.value;
    if (expenseTitleInputEle.value === "") {
        expenseTitleInputErrMsgEle.textContent = "*Required";
    } else if (expenseAmountInputEle.value === "") {
        expenseAmountInputErrMsgEle.textContent = "*Required";
    } else {
        expenseTitleInputErrMsgEle.textContent = "";
        expenseAmountInputErrMsgEle.textContent = "";
        createAList(expenseTitleValue, expenseAmountValue);
        totalData["expenses"] = parseInt(totalData["expenses"]) + parseInt(expenseAmountInput.value);
        totalExpensesAmountEle.textContent = totalData["expenses"];
        balanceAmountEle.textContent = totalData["budget"] - totalData["expenses"];
        expenseTitleInputEle.value = "";
        expenseAmountInputEle.value = "";
    }
});

budgetInputEle.addEventListener("change", function(event) {
    if (event.target.value === "") {
        budgetInputErrMsgEle.textContent = "*Required";
    }
});

expenseTitleInputEle.addEventListener("change", function(event) {
    if (event.target.value === "") {
        expenseTitleInputErrMsgEle.textContent = "*Required";
    }
});

expenseAmountInputEle.addEventListener("change", function(event) {
    if (event.target.value === "") {
        expenseAmountInputErrMsgEle.textContent = "*Required";
    }
});

formBudgetEle.addEventListener("submit", function(event) {
    event.preventDefault();
});

expenseFormEle.addEventListener("submit", function(event) {
    event.preventDefault();
});