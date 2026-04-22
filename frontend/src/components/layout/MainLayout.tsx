import { PropsWithChildren } from 'react';

function MainLayout({ children }: PropsWithChildren) {
  return (
    <div className="main-layout">
      <header>
        <h1>AI System Insights</h1>
      </header>
      <main>{children}</main>
    </div>
  );
}

export default MainLayout;
