import React from "react";


export default class SingleMovie extends React.Component {
  componentDidMount() {
    this.props.selectMovie(this.props.movieId);
  }
  render() {
    const { movie } = this.props;
    return (
    <>
    <div id="movie-card-container"></div>
	<div className="movie-card border-radius margin-top-50">
		<div className="row">
			<div className="col-sm-4">
				<img src={movie.Poster} alt="poster" className="img-responsive movie-poster" />
			</div>
			<div className="col-sm-8">
				<h3 >{movie.Title}</h3>

				<div className="row margin-top-20">
					<div className="col-sm-4">
						<strong>Year: </strong>{movie.Year}
					</div>
					<div className="col-sm-4">
						<strong>Rated: </strong>{movie.Rated}
					</div>
					<div className="col-sm-4">
						<strong>Released: </strong>{movie.Released}
					</div>
				</div>

				<div className="row margin-top-20">
					<div className="col-sm-4">
						<strong>Runtime: </strong>{movie.Runtime}
					</div>
					<div className="col-sm-4">
						<strong>Genre: </strong>{movie.Genre}
					</div>
					<div className="col-sm-4">
						<strong>Director: </strong>{movie.Director}
					</div>
				</div>

				<div className="row margin-top-20">
					<div className="col-sm-12">
						<strong>Actors: </strong>{movie.Actors}
					</div>
				</div>

				<div className="row margin-top-20">
					<div className="col-sm-12">
						<strong>Plot: </strong>{movie.Plot}
					</div>
				</div>
			</div>
		</div>
	</div>
  </>)
  }
}

// render() {
//   const { movie} = this.props;
