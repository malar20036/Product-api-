<template>
  <div class="container">
    <h1>Product List</h1>
    <button @click="addProduct" class="add-button">
      <i class="fas fa-plus"></i> Add New
    </button>
    <table>
      <thead>
        <tr>
          <th></th> <!-- Column for delete button -->
          <th>ID</th>
          <th>Name</th>
          <th>Description</th>
          <th>Price</th>
          <th>Category</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="product in products" :key="product.id">
          <td>
            <button @click="removeProduct(product.id)" class="delete-button">
              <i class="fas fa-trash"></i>
            </button>
          </td>
          <td>{{ product.id }}</td>
          <td>
            <input v-model="product.title" :disabled="product.locked" />
          </td>
          <td>
            <input v-model="product.description" :disabled="product.locked" />
          </td>
          <td>
            <input 
              v-model="product.price" 
              :disabled="product.locked" 
              :class="isPriceInvalid(product.price) ? 'invalid' : ''" 
            />
          </td>
          <td>
            <input 
              v-model="product.category" 
              :disabled="product.locked" 
              :class="isCategoryInvalid(product.category) ? 'invalid' : ''" 
            />
          </td>
          <td>
            <button @click="toggleEdit(product)" class="edit-button">
              <i class="fas fa-edit"></i>
            </button>
            <button @click="toggleLock(product)" :class="product.locked ? 'lock-button locked' : 'lock-button'">
              <i :class="product.locked ? 'fas fa-lock' : 'fas fa-unlock'"></i>
            </button>
          </td>
        </tr>
      </tbody>
    </table>
    <button @click="submitChanges" class="submit-button">Submit</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      products: []
    };
  },
  created() {
    // Fetch data from the FakeStoreAPI
    // fetch('https://fakestoreapi.com/products')
    fetch('https://6662941e62966e20ef09176b.mockapi.io/api/product/PRODUCTLIST')
      .then(response => response.json())
      .then(data => {
        // Map the response to format it as products
        this.products = data.map(product => ({
          id: product.id,
          title: product.title,
          description: product.description,
          price: product.price,
          category: product.category,
          editable: false,
          locked: true
        }));
      });
  },
  methods: {
    // Toggle editing mode for a product
    toggleEdit(product) {
      product.editable = !product.editable;
      if (product.editable) {
        product.locked = false; // Unlock when editing
      }
    },
    // Toggle locked state for a product
    toggleLock(product) {
      product.locked = !product.locked;
      if (product.locked) {
        product.editable = false; // Disable editing when locked
      }
    },
    // Remove a product from the list
    removeProduct(productId) {
      this.products = this.products.filter(product => product.id !== productId);
    },
    // Add a new product to the list
    addProduct() {
      const newProduct = {
        id: this.products.length + 1, // Simple ID generation
        title: '',
        description: '',
        price: '',
        category: '',
        editable: true,
        locked: false
      };
      this.products.push(newProduct);
    },
    // Submit changes (just logging for demonstration)
    submitChanges() {
      console.log('Submitted Products:', this.products);
      // Display an alert prompt
      alert('Submitted Successfully');
      // Here you can send this.products to your API
      // For demonstration purposes, we'll just log the data
    },
    // Spell check method for category
    isCategoryInvalid(category) {
      return /[0-9]/.test(category); // Checks if category contains any numbers
    },
    // Update the checkPrice method to validate price
    isPriceInvalid(price) {
      return !/^\d*\.?\d*$/.test(price); // Checks for valid price format
    }
  }
};
</script>

<style>
@import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css');

.container {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  font-family: Arial, sans-serif;
}

h1 {
  text-align: center;
  color: #333;
  margin-bottom: 20px;
}

table {
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

th, td {
  padding: 12px;
  border: 1px solid #ddd;
  text-align: left;
}

th {
  background-color: #f4f4f4;
}

td {
  background-color: #fff;
}

button {
  border: none;
  background: none;
  cursor: pointer;
  padding: 5px;
  margin: 0 2px;
  font-size: 16px;
}

button i {
  font-size: 18px;
}

.delete-button i {
  color: #e74c3c; /* Red color for delete button */
}

.edit-button i {
  color: #2ecc71; /* Green color for edit button */
}

.lock-button i {
  color: #f39c12; /* Orange color for lock/unlock button */
}

.lock-button.locked i {
  color: #3498db; /* Blue color for locked state */
}

.add-button {
  display: flex;
  align-items: center;
  color: #2ecc71; /* Green color for add button */
  margin-bottom: 20px;
  font-size: 16px;
}

.add-button i {
  margin-right: 5px;
}

input {
  width: 100%;
  padding: 8px;
  box-sizing: border-box;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;
}

.submit-button {
  display: block;
  width: 100%;
  padding: 12px;
  background-color: #3498db;
  color: #fff;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;
  text-align: center;
}

.submit-button:hover {
  background-color: #2980b9;
}

.valid {
  background-color: #2ecc71; /* Green for valid input */
}

.invalid {
  background-color: #e74c3c; /* Red for invalid input */
}
</style>
