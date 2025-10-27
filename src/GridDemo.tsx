import './styles/App.scss';

function GridDemo() {
  return (
    <>
      {/* Example 1: Basic CSS Grid Layout */}
      <section className="container" style={{ marginBottom: '2rem' }}>
        <h2>Basic 24-Column CSS Grid</h2>
        <div className="grid">
          <div className="col-6" style={{ background: '#FFB8F6', padding: '1rem' }}>
            col-6 (6/24 columns)
          </div>
          <div className="col-6" style={{ background: '#E1FF69', padding: '1rem' }}>
            col-6 (6/24 columns)
          </div>
          <div className="col-12" style={{ background: '#4B71D8', padding: '1rem', color: 'white' }}>
            col-12 (12/24 columns)
          </div>
        </div>
      </section>

      {/* Example 2: Precise Positioning */}
      <section className="container" style={{ marginBottom: '2rem' }}>
        <h2>Precise Grid Positioning</h2>
        <div className="grid">
          <div className="col-start-5 col-end-13" style={{ background: '#FFB8F6', padding: '1rem' }}>
            Start at column 5, end at column 13
          </div>
          <div className="col-start-15 col-end-21" style={{ background: '#E1FF69', padding: '1rem' }}>
            Start at column 15, end at column 21
          </div>
          <div className="col-full" style={{ background: '#4B71D8', padding: '1rem', color: 'white' }}>
            Full width (col-full)
          </div>
        </div>
      </section>

      {/* Example 3: Responsive Layout */}
      <section className="container" style={{ marginBottom: '2rem' }}>
        <h2>Responsive CSS Grid</h2>
        <div className="grid">
          <div className="col-24 col-md-12 col-lg-8" style={{ background: '#FFB8F6', padding: '1rem' }}>
            Full → Half → Third
          </div>
          <div className="col-24 col-md-12 col-lg-8" style={{ background: '#E1FF69', padding: '1rem' }}>
            Full → Half → Third
          </div>
          <div className="col-24 col-md-24 col-lg-8" style={{ background: '#4B71D8', padding: '1rem', color: 'white' }}>
            Full → Full → Third
          </div>
        </div>
      </section>

      {/* Example 4: Complex Positioning */}
      <section className="container" style={{ marginBottom: '2rem' }}>
        <h2>Complex Grid Positioning</h2>
        <div className="grid">
          <div className="col-start-4 col-end-16 col-md-start-6 col-md-end-19" style={{ background: '#FFB8F6', padding: '1rem' }}>
            Different start/end positions per breakpoint
          </div>
          <div className="col-start-18 col-end-25 col-md-start-20 col-md-end-25" style={{ background: '#E1FF69', padding: '1rem' }}>
            Another positioned element
          </div>
        </div>
      </section>

      {/* Example 5: Grid Alignment */}
      <section className="container" style={{ marginBottom: '2rem' }}>
        <h2>Grid Alignment</h2>
        <div className="grid justify-items-center align-items-center" style={{ minHeight: '200px', background: '#EFEFEF' }}>
          <div className="col-6" style={{ background: '#FFB8F6', padding: '1rem' }}>
            Centered in cell
          </div>
          <div className="col-4 justify-self-end" style={{ background: '#E1FF69', padding: '1rem' }}>
            Self-aligned to end
          </div>
          <div className="col-8 align-self-start" style={{ background: '#4B71D8', padding: '1rem', color: 'white' }}>
            Self-aligned to start
          </div>
        </div>
      </section>

      {/* Example 6: No Gap */}
      <section className="container" style={{ marginBottom: '2rem' }}>
        <h2>No Gap Grid</h2>
        <div className="grid no-gap">
          <div className="col-8" style={{ background: '#FFB8F6', padding: '1rem' }}>
            No spacing
          </div>
          <div className="col-8" style={{ background: '#E1FF69', padding: '1rem' }}>
            No spacing
          </div>
          <div className="col-8" style={{ background: '#4B71D8', padding: '1rem', color: 'white' }}>
            No spacing
          </div>
        </div>
      </section>

      {/* Example 7: Variable Gap Sizes */}
      <section className="container" style={{ marginBottom: '2rem' }}>
        <h2>Variable Gap Sizes</h2>
        <div className="grid gap-sm">
          <div className="col-8" style={{ background: '#FFB8F6', padding: '1rem' }}>
            Small gap
          </div>
          <div className="col-8" style={{ background: '#E1FF69', padding: '1rem' }}>
            Small gap
          </div>
          <div className="col-8" style={{ background: '#4B71D8', padding: '1rem', color: 'white' }}>
            Small gap
          </div>
        </div>
        
        <div className="grid gap-xl" style={{ marginTop: '2rem' }}>
          <div className="col-8" style={{ background: '#FFB8F6', padding: '1rem' }}>
            Extra large gap
          </div>
          <div className="col-8" style={{ background: '#E1FF69', padding: '1rem' }}>
            Extra large gap
          </div>
          <div className="col-8" style={{ background: '#4B71D8', padding: '1rem', color: 'white' }}>
            Extra large gap
          </div>
        </div>
      </section>

      {/* Example 8: Row Spanning */}
      <section className="container" style={{ marginBottom: '2rem' }}>
        <h2>Row Spanning</h2>
        <div className="grid">
          <div className="col-12 row-2" style={{ background: '#FFB8F6', padding: '1rem' }}>
            Spans 2 rows
          </div>
          <div className="col-12" style={{ background: '#E1FF69', padding: '1rem' }}>
            Single row
          </div>
          <div className="col-12" style={{ background: '#4B71D8', padding: '1rem', color: 'white' }}>
            Single row
          </div>
        </div>
      </section>
    </>
  );
}

export default GridDemo;
