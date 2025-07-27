import './App.css'
import Header from './components/Header'
import Footer from './components/Footer'
import TodoList from './components/TodoList'

function App() {
  return (
    <div className="App">
      <Header />
      <main className="App-main">
        <h1>Welcome to Your To Do App!</h1>
        <p>
          Organize your tasks and stay productive with this simple todo application.
        </p>
        <TodoList />
      </main>
      <Footer />
    </div>
  )
}

export default App
