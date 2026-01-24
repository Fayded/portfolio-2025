import './styles/history.scss';

const careers = [
  { year: 2025, company: 'Morgan Stanley' },
  { year: 2023, company: 'Talitrix' },
  { year: 2021, company: 'Red Ventures' },
  { year: 2020, company: 'Porsche Digital' },
  { year: 2018, company: 'Captech' },
  { year: 2017, company: 'Arvata' },
  { year: 2015, company: 'Razorfish' },
  { year: 2013, company: 'Ogilvy & Mather' },
];

function History() {
  return (
    <section className="container">
      <h2 className="my-2">Resume / CV</h2>
      <section className="careers">
        {careers.map((job) => (
          <section className="career" key={job.year}>
            <div className="career-year">
              <p>{job.year}</p>
              <span></span>
            </div>
            <h2 className="career-company">{job.company}</h2>
          </section>
        ))}
      </section>
    </section>
  );
}

export default History;
