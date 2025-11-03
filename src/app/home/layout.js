export default function HomeLayout({ children }) {
    return (
      <div>
        <aside>
            <h1>Home Sidebar</h1>
            <ul>
                <li>Item 1</li>
                <li>Item 2</li>
                <li>Item 3</li>
            </ul>


        </aside>
        <section>{children}</section>
      </div>
    );
  }
  